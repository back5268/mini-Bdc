import { getData, postData } from '@lib/axios';

export const getListDebtLogApi = (params) => getData('/web/debts/getListDebtLog', params);
export const getListDebtApi = (params) => getData('/web/debts/getListDebt', params);
export const calculatorDebtApi = (params) => postData('/web/debts/calculatorDebt', params);
