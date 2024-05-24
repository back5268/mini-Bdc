import { getData, putData } from '@lib/axios';

export const getListToolApi = (params) => getData('/web/tools/getListTool', params);
export const updateToolApi = (params) => putData('/web/tools/updateTool', params);
