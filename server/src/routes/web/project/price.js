import { addPrice, deletePrice, detailPrice, getListPrice, updatePrice } from '@controller';
import express from 'express';

export const priceRouter = express.Router();

priceRouter.get('/getListPrice', getListPrice);
priceRouter.get('/detailPrice', detailPrice);
priceRouter.delete('/deletePrice', deletePrice);
priceRouter.post('/addPrice', addPrice);
priceRouter.put('/updatePrice', updatePrice);
