import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListUserApi = (params) => getData('/admin/users/getListUser', params);
export const deleteUserApi = (params) => deleteData('/admin/users/deleteUser', params);
export const addUserApi = (params) => postData('/admin/users/addUser', params, true);
export const updateUserApi = (params) => putData('/admin/users/updateUser', params, true);
export const resetPasswordApi = (params) => putData('/admin/users/resetPassword', params);

export const updateUserInfoApi = (params) => putData('/users/updateUserInfo', params);
export const changePasswordApi = (params) => putData('/users/changePassword', params);
