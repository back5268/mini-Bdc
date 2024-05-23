import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListTemplateApi = (params) => getData('/admin/templates/getListTemplate', params);
export const deleteTemplateApi = (params) => deleteData('/admin/templates/deleteTemplate', params);
export const addTemplateApi = (params) => postData('/admin/templates/addTemplate', params);
export const updateTemplateApi = (params) => putData('/admin/templates/updateTemplate', params);
