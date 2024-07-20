import { autoAccounting, getListCoin } from '@controller';
import express from 'express';

export const coinRouter = express.Router();

coinRouter.get('/getListCoin', getListCoin);
coinRouter.post('/autoAccounting', autoAccounting);
