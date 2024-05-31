import { getData } from '@lib/axios';

export const getListElectricWaterApi = (params) => getData('/web/electric-waters/getListElectricWater', params);
