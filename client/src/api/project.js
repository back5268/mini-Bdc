import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListProjectApi = (params) => getData('/web/projects/getListProject', params);
export const detailProjectApi = (params) => getData('/web/projects/detailProject', params);
export const deleteProjectApi = (params) => deleteData('/web/projects/deleteProject', params);
export const addProjectApi = (params) => postData('/web/projects/addProject', params, true);
export const updateProjectApi = (params) => putData('/web/projects/updateProject', params, true);
