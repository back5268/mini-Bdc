import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListApartmentGroupApi = (params) => getData('/web/apartment-groups/getListApartmentGroup', params);
export const detailApartmentGroupApi = (params) => getData('/web/apartment-groups/detailApartmentGroup', params);
export const addApartmentGroupApi = (params) => postData('/web/apartment-groups/addApartmentGroup', params);
export const updateApartmentGroupApi = (params) => putData('/web/apartment-groups/updateApartmentGroup', params);
export const deleteApartmentGroupApi = (params) => deleteData('/web/apartment-groups/deleteApartmentGroup', params);
