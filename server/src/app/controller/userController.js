import { uploadFileToFirebase } from '@lib/firebase';
import {
  addUserValid,
  changePasswordValid,
  detailUserValid,
  listUserValid,
  resetPasswordValid,
  updateUserValid
} from '@lib/validation';
import { countUserMd, createUserMd, deleteUserMd, detailUserMd, listUserMd, updateUserMd } from '@models';
import { generateRandomString, validateData } from '@utils';
import bcrypt from 'bcrypt';

export const getListUser = async (req, res) => {
  try {
    const { error, value } = validateData(listUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, email, type, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { username: { $regex: email, $options: 'i' } }];
    if (type) {
      if (type === 'resident') where.type = 'resident';
      else where.type = { $in: ['user', 'admin'] };
    }
    if (status || status === 0) where.status = status;

    const documents = await listUserMd(where, page, limit);
    const total = await countUserMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListUserInfo = async (req, res) => {
  try {
    const data = await listUserMd({ type: { $in: ['user', 'admin'] } });
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
    const data = await detailUserMd({ _id });
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
    const { username, code, email } = value;

    const checkEmail = await detailUserMd({ email });
    if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });

    const checkUsername = await detailUserMd({ username });
    if (checkUsername) return res.status(400).json({ status: false, mess: 'Username đã tồn tại!' });

    const checkCode = await detailUserMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã nhân viên đã tồn tại!' });

    if (req.file) {
      value.avatar = await uploadFileToFirebase(req.file);
    }

    res.json({ status: true, data: await createUserMd(value) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error, value } = validateData(updateUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { _id, username, email, code } = value;

    const user = await detailUserMd({ _id });
    if (!user) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });

    if (email) {
      const checkEmail = await detailUserMd({ email });
      if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    }

    if (username) {
      const checkUsername = await detailUserMd({ username });
      if (checkUsername) return res.status(400).json({ status: false, mess: 'Username đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailUserMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã nhân viên đã tồn tại!' });
    }

    if (req.file) {
      value.avatar = await uploadFileToFirebase(req.file);
    }

    const data = await updateUserMd({ _id }, value);
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

    const newPassword = generateRandomString(8);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    await updateUserMd({ _id: value._id }, { password, token: '' });
    res.status(201).json({ status: true, data: newPassword });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

