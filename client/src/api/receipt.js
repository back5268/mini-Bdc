import { getData, postData, putData } from '@lib/axios';

export const getListReceiptApi = (params) => getData('/web/receipts/getListReceipt', params);
export const addReceiptApi = (params) => postData('/web/receipts/addReceipt', params);
export const cancelReceiptApi = (params) => putData('/web/receipts/cancelReceipt', params);
export const getListBillByApartmentApi = (params) => getData('/web/receipts/getListBillByApartment', params);
export const getCoinByApartmentApi = (params) => getData('/web/receipts/getCoinByApartment', params);
