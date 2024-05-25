import { getData } from '@lib/axios';

export const getListUserInfoApi = (params) => getData('/info/getListUserInfo', params);
export const getListDepartmentInfoApi = (params) => getData('/info/getListDepartmentInfo', params);
export const getListPriceInfoApi = (params) => getData('/web/info/getListPriceInfo', params);
export const getListServiceInfoApi = (params) => getData('/web/info/getListServiceInfo', params);
