import { getData } from '@lib/axios';

export const getListCoinApi = (params) => getData('/web/coins/getListCoin', params);