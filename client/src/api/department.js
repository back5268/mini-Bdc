import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListDepartmentApi = (params) => getData('/admin/departments/getListDepartment', params);
export const deleteDepartmentApi = (params) => deleteData('/admin/departments/deleteDepartment', params);
export const addDepartmentApi = (params) => postData('/admin/departments/addDepartment', params);
export const updateDepartmentApi = (params) => putData('/admin/departments/updateDepartment', params);
