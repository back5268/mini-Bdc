import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListProjectApi = (params) => getData('/admin/projects/getListProject', params);
export const detailProjectApi = (params) => getData('/admin/projects/detailProject', params);
export const deleteProjectApi = (params) => deleteData('/admin/projects/deleteProject', params);
export const addProjectApi = (params) => postData('/admin/projects/addProject', params, true);
export const updateProjectApi = (params) => putData('/admin/projects/updateProject', params, true);
