import { getData, postData } from '@lib/axios';

export const getListTemplateApi = (params) => getData('/admin/templates/getListTemplate', params);
export const detailTemplateApi = (params) => getData('/admin/templates/detailTemplate', params);
export const deleteTemplateApi = (params) => postData('/admin/templates/deleteTemplate', params);
export const addTemplateApi = (params) => postData('/admin/templates/addTemplate', params);
export const updateTemplateApi = (params) => postData('/admin/templates/updateTemplate', params);
