import express from 'express';
import { getListDepartmentInfo, getListPriceInfo, getListServiceInfo, getListUserInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListDepartmentInfo', getListDepartmentInfo);
infoRouter.get('/getListPriceInfo', getListPriceInfo);
infoRouter.get('/getListServiceInfo', getListServiceInfo);
