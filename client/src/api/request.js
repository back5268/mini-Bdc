import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListRequestApi = (params) => getData('/web/requests/getListRequest', params);
export const detailRequestApi = (params) => getData('/web/requests/detailRequest', params);
export const addRequestApi = (params) => postData('/web/requests/addRequest', params);
export const updateRequestApi = (params) => putData('/web/requests/updateRequest', params);
export const deleteRequestApi = (params) => deleteData('/web/requests/deleteRequest', params);
