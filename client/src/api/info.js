import { getData } from '@lib/axios';

export const getListUserInfoApi = (params) => getData('/info/getListUserInfo', params);
export const getListDepartmentInfoApi = (params) => getData('/info/getListDepartmentInfo', params);
