import { addPrice, deletePrice, detailPrice, getListPrice, getListPriceInfo, updatePrice } from '@controller';
import express from 'express';

export const priceRouter = express.Router();

priceRouter.get('/getListPrice', getListPrice);
priceRouter.get('/getListPriceInfo', getListPriceInfo);
priceRouter.get('/detailPrice', detailPrice);
priceRouter.delete('/deletePrice', deletePrice);
priceRouter.post('/addPrice', addPrice);
priceRouter.put('/updatePrice', updatePrice);
