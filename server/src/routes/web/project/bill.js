import { detailBill, getListBill, updateStatusBill } from '@controller';
import express from 'express';

export const billRouter = express.Router();

billRouter.get('/getListBill', getListBill);
billRouter.put('/updateStatusBill', updateStatusBill);
billRouter.get('/detailBill', detailBill);
