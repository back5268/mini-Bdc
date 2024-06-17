import { detailUserMd, updateUserMd } from '@models';
import dotenv from 'dotenv';
import { sendOtpAuthValid } from '@lib/validation';
import { generateNumber, validateData } from '@utils';
import { sendMailForgotPassword } from '@lib/node-mailer';
import moment from 'moment';
dotenv.config();

export const sendOtpAuthRepo = async (body) => {
  const { error, value } = validateData(sendOtpAuthValid, body);
  if (error) return { mess: error };
  const { username } = value;

  const otp = generateNumber(6);
  const checkUser = await detailUserMd({ username });
  if (!checkUser) return { mess: `Không tìm thấy người dùng!` };
  if (checkUser.status === 0) return { mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' };
  await sendMailForgotPassword({ to: checkUser.email, username, otp });
  await updateUserMd({ _id: checkUser._id }, { otp, timeSendOtp: moment().format('YYYY-MM-DD') });
  return { data: {} };
};
