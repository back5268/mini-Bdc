import bcrypt from 'bcrypt';
import { confirmPasswordValid, signinValid } from '@lib/validation';
import { detailUserMd, listProjectMd, listToolMd, updateUserMd } from '@models';
import { sendOtpAuthRepo } from '@repository';
import { validateData } from '@utils';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const getInfo = async (req, res) => {
  try {
    const where = {};
    if (req.userInfo.type !== 'admin') where._id = { $in: req.userInfo.department?.projects };
    const projects = await listProjectMd(where);
    let tools = req.tools;
    const permissions = req.permissions;
    if (!tools) {
      const toolz = await listToolMd({ status: 1 }, false, false, false, 'name icon children', { sort: 1 });
      tools = toolz.map((tool) => {
        const children = tool.children;
        let childrenz = [];
        children.forEach((c) => {
          if (permissions.find((p) => p.route === c.route)) childrenz.push(c);
        });
        if (childrenz.length > 0) return { ...tool?._doc, children: childrenz };
      });
      tools = tools.filter(t => t)
    }
    res.json({ status: true, data: { userInfo: req.userInfo, permissions: req.permissions, projects, tools } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error, value } = validateData(signinValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { username, password } = value;
    const checkUsername = await detailUserMd({ username });
    if (!checkUsername) return res.status(400).json({ status: false, mess: 'Không tìm thấy người dùng!' });
    if (checkUsername.status === 0)
      return res.status(400).json({ status: false, mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' });
    const passLogin = await bcrypt.compare(password, checkUsername.password);
    if (!passLogin) return res.status(400).json({ status: false, mess: 'Mật khẩu không hợp lệ!' });
    const token = jwt.sign({ _id: checkUsername._id }, process.env.JWT_SECRET_TOKEN);
    await updateUserMd({ _id: checkUsername._id }, { token, lastLogin: new Date() });
    res.json({ status: true, data: token });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const sendOtpForgotPassword = async (req, res) => {
  try {
    const { data, mess } = await sendOtpAuthRepo(req.body, 2);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const confirmPassword = async (req, res) => {
  try {
    const { error, value } = validateData(confirmPasswordValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { username, email, otp, password } = value;
    const checkUser = await detailUserMd({ username, email });
    if (!checkUser)
      return res.status(400).json({ status: false, mess: `Không tìm thấy người dùng có tài khoản ${username} và email ${email}!` });
    const checkOtp = await getDetailUserVerifyMd({ type: 2, otp, email, username, expiredAt: { $gte: new Date() } });
    if (!checkOtp) return res.status(400).json({ status: false, mess: 'Mã xác nhận không đúng hoặc đã hết hạn!' });
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const data = await updateUserMd({ _id: checkUser._id }, { password: newPassword, token: '' });
    await deleteUserVerifyMd({ _id: checkOtp._id });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
