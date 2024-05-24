import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListPriceApi = (params) => getData('/web/prices/getListPrice', params);
export const detailPriceApi = (params) => getData('/web/prices/detailPrice', params);
export const deletePriceApi = (params) => deleteData('/web/prices/deletePrice', params);
export const addPriceApi = (params) => postData('/web/prices/addPrice', params);
export const updatePriceApi = (params) => putData('/web/prices/updatePrice', params);
