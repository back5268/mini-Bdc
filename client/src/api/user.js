import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListUserApi = (params) => getData('/web/users/getListUser', params);
export const deleteUserApi = (params) => deleteData('/web/users/deleteUser', params);
export const addUserApi = (params) => postData('/web/users/addUser', params, true);
export const updateUserApi = (params) => putData('/web/users/updateUser', params, true);
export const resetPasswordApi = (params) => putData('/web/users/resetPassword', params);

export const updateUserInfoApi = (params) => putData('/users/updateUserInfo', params);
export const changePasswordApi = (params) => putData('/users/changePassword', params);
