import { getData, postData } from '@lib/axios';

export const getListUserApi = (params) => getData('/admin/users/getListUser', params);
export const deleteUserApi = (params) => postData('/admin/users/deleteUser', params);
export const addUserApi = (params) => postData('/admin/users/addUser', params, true);
export const updateUserApi = (params) => postData('/admin/users/updateUser', params, true);
export const resetPasswordApi = (params) => postData('/admin/users/resetPassword', params);

export const updateUserInfoApi = (params) => postData('/users/updateUserInfo', params, true);
export const changePasswordApi = (params) => postData('/users/changePassword', params);
