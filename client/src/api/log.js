import { getData } from '@lib/axios';

export const getListLogApi = (params) => getData('/admin/logs/getListLog', params);
