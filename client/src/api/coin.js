import { getData, postData } from '@lib/axios';

export const getListCoinApi = (params) => getData('/web/coins/getListCoin', params);
export const autoAccountingApi = (params) => postData('/web/coins/autoAccounting', params);