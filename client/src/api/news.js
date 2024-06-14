import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListNewsApi = (params) => getData('/web/news/getListNews', params);
export const deleteNewsApi = (params) => deleteData('/web/news/deleteNews', params);
export const addNewsApi = (params) => postData('/web/news/addNews', params);
export const updateNewsApi = (params) => putData('/web/news/updateNews', params);
