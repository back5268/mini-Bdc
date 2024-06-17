import express from 'express';
import { getListApartmentGroupInfo, getListApartmentInfo, getListDepartmentInfo, getListMonth, getListPriceInfo, getListProjectInfo, getListResidentInfo, getListServiceInfo, getListUserInfo } from '@controller';
import { authMiddleware, projectMiddleware } from '@middleware';

export const infoRouter = express.Router();

infoRouter.use(authMiddleware)
infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListDepartmentInfo', getListDepartmentInfo);
infoRouter.get('/getListProjectInfo', getListProjectInfo);
infoRouter.get('/getListApartmentInfo', projectMiddleware, getListApartmentInfo);
infoRouter.get('/getListResidentInfo', projectMiddleware, getListResidentInfo);
infoRouter.get('/getListApartmentGroupInfo', projectMiddleware, getListApartmentGroupInfo);
infoRouter.get('/getListPriceInfo', projectMiddleware, getListPriceInfo);
infoRouter.get('/getListServiceInfo', projectMiddleware, getListServiceInfo);
infoRouter.get('/getListMonth', projectMiddleware, getListMonth);
