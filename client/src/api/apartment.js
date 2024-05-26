import { getData, postData, putData } from '@lib/axios';

export const getListApartmentApi = (params) => getData('/web/apartments/getListApartment', params);
export const detailApartmentApi = (params) => getData('/web/apartments/detailApartment', params);
export const addApartmentApi = (params) => postData('/web/apartments/addApartment', params);
export const updateApartmentApi = (params) => putData('/web/apartments/updateApartment', params);
