import { getData, postData } from '@lib/axios';

export const addResidentApi = (params) => postData('/web/residents/addResident', params, true);
export const getListResidentApi = (params) => getData('/web/residents/getListResident', params);