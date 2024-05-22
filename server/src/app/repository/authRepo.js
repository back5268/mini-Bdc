import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  addLogMd,
  addUserMd,
  addUserVerifyMd,
  deleteManyUserVerifyMd,
  deleteUserVerifyMd,
  getDetailUserMd,
  getDetailUserVerifyMd,
  updateUserMd
} from '@models';
import dotenv from 'dotenv';
import { sendOtpAuthValid } from '@lib/validation';
import { generateNumber, generateRandomString, validateData } from '@utils';
import { sendMailForgotPassword, sendMailSignup } from '@lib/node-mailer';
dotenv.config();

export const signinRp = async ({ username, password }) => {
  const checkUsername = await getDetailUserMd({ $or: [{ username }, { email: username }] });
  if (!checkUsername) return { mess: 'Không tìm thấy người dùng!' };
  if (checkUsername.status === 0) return { mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' };
  const passLogin = await bcrypt.compare(password, checkUsername.password);
  if (!passLogin) return { mess: 'Mật khẩu không hợp lệ!' };
  const token = jwt.sign({ _id: checkUsername._id }, process.env.JWT_SECRET_TOKEN);
  await updateUserMd({ _id: checkUsername._id }, { token, lastLogin: new Date() });
  return { data: token };
};

export const createUserRp = async ({ name, username, email, code, bio, password, otp, type, avatar, gender, birthday }) => {
  const checkEmail = await getDetailUserMd({ email });
  if (checkEmail) return { mess: 'Email đã tồn tại!' };
  const checkUsername = await getDetailUserMd({ username });
  if (checkUsername) return { mess: 'Tài khoản đã tồn tại!' };

  if (code) {
    const checkCode = await getDetailUserMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã nhân viên đã tồn tại!' });
  }

  if (otp) {
    const checkOtp = await getDetailUserVerifyMd({ type: 1, otp, email, username, expiredAt: { $gte: new Date() } });
    if (!checkOtp) return { mess: 'Mã xác nhận không đúng hoặc đã hết hạn!' };
    await deleteUserVerifyMd({ _id: checkOtp._id });
  }

  password = password ? password : generateRandomString();
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  const data = await addUserMd({ name, username, email, password: newPassword, avatar, code, bio, type, gender, birthday });
  return { data };
};

export const sendOtpAuthRepo = async (body, type) => {
  const { error, value } = validateData(sendOtpAuthValid, body);
  if (error) return { mess: error };
  const { username, email } = value;

  let dataMail = {};
  const otp = generateNumber(6);

  if (type === 1) {
    const checkEmail = await getDetailUserMd({ email });
    if (checkEmail) return { mess: 'Email đã tồn tại!' };
    const checkUsername = await getDetailUserMd({ username });
    if (checkUsername) return { mess: 'Tài khoản đã tồn tại!' };
    dataMail = await sendMailSignup({ to: email, username, otp });
  } else {
    const checkUser = await getDetailUserMd({ $or: [{ username }, { email: username }] });
    if (!checkUser) return { mess: `Không tìm thấy người dùng!` };
    if (checkUser.status === 0) return { mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' };
    dataMail = await sendMailForgotPassword({ to: email, username, otp });
  }
  if (dataMail?.status) {
    await addLogMd({ ...dataMail?.data, type });
    await deleteManyUserVerifyMd({ username, email, type });
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 30);
    const data = await addUserVerifyMd({ username, email, otp, type, expiredAt });
    return { data };
  } else return { mess: dataMail.mess };
};
