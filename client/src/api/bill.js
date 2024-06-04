import { getData, postData, putData } from '@lib/axios';

export const getListBillApi = (params) => getData('/web/bills/getListBill', params);
export const updateStatusBillApi = (params) => putData('/web/bills/updateStatusBill', params);
export const detailBillApi = (params) => getData('/web/bills/detailBill', params);
