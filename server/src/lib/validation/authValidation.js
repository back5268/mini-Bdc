import { REGEX } from '@constant';

export const signinValid = {
  username: 'string',
  password: { type: 'string', pattern: REGEX.PASSWORD }
};

export const sendOtpAuthValid = {
  username: 'string',
};

export const confirmPasswordValid = {
  username: 'string',
  otp: 'string',
  password: { type: 'string', pattern: REGEX.PASSWORD }
};
