import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListVehicleApi = (params) => getData('/web/vehicles/getListVehicle', params);
export const detailVehicleApi = (params) => getData('/web/vehicles/detailVehicle', params);
export const deleteVehicleApi = (params) => deleteData('/web/vehicles/deleteVehicle', params);
export const addVehicleApi = (params) => postData('/web/vehicles/addVehicle', params, true);
export const updateVehicleApi = (params) => putData('/web/vehicles/updateVehicle', params, true);
