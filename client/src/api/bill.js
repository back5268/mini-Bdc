import { getData, postData } from '@lib/axios';

export const getListBillApi = (params) => getData('/web/bills/getListBill', params);
export const detailBillApi = (params) => getData('/web/bills/detailBill', params);
