import express from 'express';
import { getListTool, getListUserInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListTool', getListTool);
