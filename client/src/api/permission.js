import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListPermissionApi = (params) => getData('/admin/permissions/getListPermission', params);
export const detailPermissionApi = (params) => getData('/admin/permissions/detailPermission', params);
export const deletePermissionApi = (params) => deleteData('/admin/permissions/deletePermission', params);
export const addPermissionApi = (params) => postData('/admin/permissions/addPermission', params);
export const updatePermissionApi = (params) => putData('/admin/permissions/updatePermission', params);
