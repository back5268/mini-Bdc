import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListResidentApi = (params) => getData('/web/residents/getListResident', params);
export const detailResidentApi = (params) => getData('/web/residents/detailResident', params);
export const deleteResidentApi = (params) => deleteData('/web/residents/deleteResident', params);
export const addResidentApi = (params) => postData('/web/residents/addResident', params, true);
export const updateResidentApi = (params) => putData('/web/residents/updateResident', params, true);
