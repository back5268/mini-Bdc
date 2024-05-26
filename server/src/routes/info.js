import express from 'express';
import { getListDepartmentInfo, getListMonth, getListPriceInfo, getListServiceInfo, getListUserInfo } from '@controller';
import { authMiddleware, projectMiddleware } from '@middleware';

export const infoRouter = express.Router();

infoRouter.use(authMiddleware)
infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListDepartmentInfo', getListDepartmentInfo);
infoRouter.get('/getListPriceInfo', projectMiddleware, getListPriceInfo);
infoRouter.get('/getListServiceInfo', projectMiddleware, getListServiceInfo);
infoRouter.get('/getListMonth', projectMiddleware, getListMonth);
