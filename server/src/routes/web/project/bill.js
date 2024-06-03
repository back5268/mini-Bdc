import { detailBill, getListBill } from '@controller';
import express from 'express';

export const billRouter = express.Router();

billRouter.get('/getListBill', getListBill);
billRouter.get('/detailBill', detailBill);
