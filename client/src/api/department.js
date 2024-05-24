import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListDepartmentApi = (params) => getData('/web/departments/getListDepartment', params);
export const deleteDepartmentApi = (params) => deleteData('/web/departments/deleteDepartment', params);
export const addDepartmentApi = (params) => postData('/web/departments/addDepartment', params);
export const updateDepartmentApi = (params) => putData('/web/departments/updateDepartment', params);
