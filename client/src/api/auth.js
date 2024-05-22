import { getData, postData } from '@lib/axios';

export const getInfoApi = (params) => getData('/auth/getInfo', params);
export const getToolByUserApi = (params) => getData('/auth/getToolByUser', params);
export const signinApi = (params) => postData('/auth/signin', params);
export const sendOtpSignupApi = (params) => postData('/auth/sendOtpSignup', params);
export const signupApi = (params) => postData('/auth/signup', params);
export const sendOtpForgotPasswordApi = (params) => postData('/auth/sendOtpForgotPassword', params);
export const confirmPasswordApi = (params) => postData('/auth/confirmPassword', params);
