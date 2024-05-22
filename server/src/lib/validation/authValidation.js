import { REGEX } from '@constant';

export const signupValid = {
  name: 'string',
  username: 'string',
  otp: 'string',
  email: 'email',
  password: { type: 'string', pattern: REGEX.PASSWORD }
};

export const signinValid = {
  username: 'string',
  password: { type: 'string', pattern: REGEX.PASSWORD }
};

export const sendOtpAuthValid = {
  username: 'string',
  email: 'email'
};

export const confirmPasswordValid = {
  username: 'string',
  email: 'email',
  otp: 'string',
  password: { type: 'string', pattern: REGEX.PASSWORD }
};
