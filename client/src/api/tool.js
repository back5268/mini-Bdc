import { getData, putData } from '@lib/axios';

export const getListToolApi = (params) => getData('/admin/tools/getListTool', params);
export const updateToolApi = (params) => putData('/admin/tools/updateTool', params);
