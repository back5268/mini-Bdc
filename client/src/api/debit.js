import { getData, deleteData, postData } from '@lib/axios';

export const getListDebitApi = (params) => getData('/web/debits/getListDebit', params);
export const deleteDebitApi = (params) => deleteData('/web/debits/deleteDebit', params);
export const renderReceiptApi = (params) => getData('/web/bills/renderReceipt', params);
export const sendReceiptApi = (params) => postData('/web/bills/sendReceipt', params);
