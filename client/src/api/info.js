import { getData } from '@lib/axios';

export const getListUserInfoApi = (params) => getData('/info/getListUserInfo', params);
export const getListApartmentInfoApi = (params) => getData('/info/getListApartmentInfo', params);
export const getListDepartmentInfoApi = (params) => getData('/info/getListDepartmentInfo', params);
export const getListApartmentInfoApi = (params) => getData('/info/getListApartmentInfo', params);
export const getListApartmentGroupInfoApi = (params) => getData('/info/getListApartmentGroupInfo', params);
export const getListPriceInfoApi = (params) => getData('/info/getListPriceInfo', params);
export const getListServiceInfoApi = (params) => getData('/info/getListServiceInfo', params);
export const getListMonthApi = (params) => getData('/info/getListMonth', params);
