import bcrypt from 'bcrypt';
import { confirmPasswordValid, signinValid, signupValid } from '@lib/validation';
import { deleteUserVerifyMd, getDetailUserMd, getDetailUserVerifyMd, updateUserMd } from '@models';
import { createUserRp, sendOtpAuthRepo, signinRp } from '@repository';
import { validateData } from '@utils';

export const getInfo = async (req, res) => {
  try {
    res.json({ status: true, data: req.userInfo });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error, value } = validateData(signinValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { data, mess } = await signinRp(value);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const sendOtpSignup = async (req, res) => {
  try {
    const { data, mess } = await sendOtpAuthRepo(req.body, 1);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signUp = async (req, res) => {
  try {
    const { error, value } = validateData(signupValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { data, mess } = await createUserRp(value);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
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

    const checkUser = await getDetailUserMd({ username, email });
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
