import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListPermissionApi = (params) => getData('/web/permissions/getListPermission', params);
export const detailPermissionApi = (params) => getData('/web/permissions/detailPermission', params);
export const deletePermissionApi = (params) => deleteData('/web/permissions/deletePermission', params);
export const addPermissionApi = (params) => postData('/web/permissions/addPermission', params);
export const updatePermissionApi = (params) => putData('/web/permissions/updatePermission', params);
