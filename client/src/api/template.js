import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListTemplateApi = (params) => getData('/web/templates/getListTemplate', params);
export const deleteTemplateApi = (params) => deleteData('/web/templates/deleteTemplate', params);
export const addTemplateApi = (params) => postData('/web/templates/addTemplate', params);
export const updateTemplateApi = (params) => putData('/web/templates/updateTemplate', params);
