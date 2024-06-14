import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListOptionApi = (params) => getData('/web/options/getListOption', params);
export const deleteOptionApi = (params) => deleteData('/web/options/deleteOption', params);
export const addOptionApi = (params) => postData('/web/options/addOption', params);
export const updateOptionApi = (params) => putData('/web/options/updateOption', params);
