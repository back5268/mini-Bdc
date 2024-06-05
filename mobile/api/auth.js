import { getData, postData } from "@lib/axios";

export const getInfoApi = (params) => getData('/app/auth/getInfo', params);
export const signinApi = (params) => postData('/app/auth/signin', params);
export const sendOtpForgotPasswordApi = (params) => postData('/app/auth/sendOtpForgotPassword', params);
export const confirmPasswordApi = (params) => postData('/app/auth/confirmPassword', params);