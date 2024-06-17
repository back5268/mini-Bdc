import { deleteBill, detailBill, getListBill, renderBill, sendBill, updateStatusBill } from '@controller';
import express from 'express';

export const billRouter = express.Router();

billRouter.get('/getListBill', getListBill);
billRouter.put('/updateStatusBill', updateStatusBill);
billRouter.get('/detailBill', detailBill);
billRouter.get('/renderBill', renderBill);
billRouter.get('/sendBill', sendBill);
billRouter.delete('/deleteBill', deleteBill);
