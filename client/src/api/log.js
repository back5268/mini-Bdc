import { getData } from '@lib/axios';

export const getListLogApi = (params) => getData('/web/logs/getListLog', params);
