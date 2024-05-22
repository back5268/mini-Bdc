import { addUserValid, changePasswordValid, detailUserValid, listUserValid, resetPasswordValid, updateUserInfoValid, updateUserValid } from '@lib/validation';
import { countListUserMd, deleteUserMd, getDetailUserMd, getListUserMd, updateUserMd } from '@models';
import { createUserRp } from '@repository';
import { generateRandomString, validateData } from '@utils';
import { uploadFileToFirebase } from '@lib/firebase';
import bcrypt from 'bcrypt';

export const getListUser = async (req, res) => {
  try {
    const { error, value } = validateData(listUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, email, type, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { username: { $regex: email, $options: 'i' } }];
    if (type) {
      if (type === "customer") where.type = "customer"
      else where.type = { $in: ["user", "admin"] }
    }
    if (status || status === 0) where.status = status;
    const documents = await getListUserMd(where, page, limit);
    const total = await countListUserMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListUserInfo = async (req, res) => {
  try {
    const data = await getListUserMd();
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailUser = async (req, res) => {
  try {
    const { error, value } = validateData(detailUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { error, value } = validateData(detailUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addUser = async (req, res) => {
  try {
    const { error, value } = validateData(addUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });

    if (req.file) {
      value.avatar = await uploadFileToFirebase(req.file);
    }

    const { data, mess } = await createUserRp({ ...value, type: "user" });
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error, value } = validateData(updateUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { _id, name, username, email, password, code, bio, status, avatar, gender, birthday } = value;

    const user = await getDetailUserMd({ _id });
    if (!user) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });

    if (email) {
      const checkEmail = await getDetailUserMd({ email });
      if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    }

    if (username) {
      const checkUsername = await getDetailUserMd({ username });
      if (checkUsername) return res.status(400).json({ status: false, mess: 'Username đã tồn tại!' });
    }

    if (code) {
      const checkCode = await getDetailUserMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã nhân viên đã tồn tại!' });
    }

    if (req.file) {
      avatar = await uploadFileToFirebase(req.file);
    }

    const attr = { name, username, email, bio, status, avatar, code, gender, birthday };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      attr.password = await bcrypt.hash(password, salt);
    }

    const data = await updateUserMd({ _id }, attr);
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { error, value } = validateData(updateUserInfoValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { username, name, email, bio, address, avatar } = value;

    if (email) {
      const checkEmail = await getDetailUserMd({ email });
      if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    }

    if (username) {
      const checkUsername = await getDetailUserMd({ username });
      if (checkUsername) return res.status(400).json({ status: false, mess: 'Tài khoản đã tồn tại!' });
    }

    if (req.file) {
      avatar = await uploadFileToFirebase(req.file);
    }

    const attr = { username, name, email, bio, address, avatar };
    const data = await updateUserMd({ _id: req.userInfo._id }, attr);
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { error, value } = validateData(changePasswordValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });

    const passLogin = await bcrypt.compare(value.password, req.userInfo.password);
    if (!passLogin) return res.status(400).json({ status: false, mess: 'Mật khẩu không hợp lệ!' });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(value.newPassword, salt);

    const data = await updateUserMd({ _id: req.userInfo._id }, { password, token: '' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { error, value } = validateData(resetPasswordValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });

    const newPassword = generateRandomString();
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    const data = await updateUserMd({ _id: value._id }, { password, token: '' });
    res.status(201).json({ status: true, data: newPassword });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
