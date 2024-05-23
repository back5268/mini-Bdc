import express from 'express';
import { getListDepartmentInfo, getListUserInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListDepartmentInfo', getListDepartmentInfo);
