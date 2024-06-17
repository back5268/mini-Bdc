import { addReceipt, cancelReceipt, detailReceipt, getCoinByApartment, getListBillByApartment, getListReceipt } from '@controller';
import express from 'express';

export const receiptRouter = express.Router();

receiptRouter.get('/getListReceipt', getListReceipt);
receiptRouter.get('/detailReceipt', detailReceipt);
receiptRouter.post('/addReceipt', addReceipt);
receiptRouter.put('/cancelReceipt', cancelReceipt);
receiptRouter.get('/getListBillByApartment', getListBillByApartment);
receiptRouter.get('/getCoinByApartment', getCoinByApartment);
