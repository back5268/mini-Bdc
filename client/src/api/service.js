import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListServiceApi = (params) => getData('/web/services/getListService', params);
export const detailServiceApi = (params) => getData('/web/services/detailService', params);
export const checkApartmentApi = (params) => getData('/web/services/checkApartment', params);
export const deleteServiceApi = (params) => deleteData('/web/services/deleteService', params);
export const addServiceApi = (params) => postData('/web/services/addService', params);
export const updateServiceApi = (params) => putData('/web/services/updateService', params);
export const updateStatusServiceApi = (params) => putData('/web/services/updateStatusService', params);
