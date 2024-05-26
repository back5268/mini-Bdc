import { getData } from '@lib/axios';

export const getListUserInfoApi = (params) => getData('/info/getListUserInfo', params);
export const getListDepartmentInfoApi = (params) => getData('/info/getListDepartmentInfo', params);
export const getListPriceInfoApi = (params) => getData('/info/getListPriceInfo', params);
export const getListServiceInfoApi = (params) => getData('/info/getListServiceInfo', params);
export const getListMonthApi = (params) => getData('/info/getListMonth', params);
