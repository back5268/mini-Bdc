import { getData } from '@lib/axios';

export const getListUserInfoApi = (params) => getData('/info/getListUserInfo', params);
export const getListProductInfoApi = (params) => getData('/info/getListProductInfo', params);
export const getListToolApi = (params) => getData('/info/getListTool', params);
