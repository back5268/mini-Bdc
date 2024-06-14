import { deleteData, getData, postData } from '@lib/axios';

export const getListElectricWaterApi = (params) => getData('/web/electric-waters/getListElectricWater', params);
export const deleteElectricWaterApi = (params) => deleteData('/web/electric-waters/deleteElectricWater', params);
export const addElectricWaterApi = (params) => postData('/web/electric-waters/addElectricWater', params, true);
