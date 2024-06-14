import { getListLog } from '@controller';
import express from 'express';

export const logRouter = express.Router();

logRouter.get('/getListLog', getListLog);
