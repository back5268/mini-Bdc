import { getListDebtLog } from '@controller';
import express from 'express';

export const debtLogRouter = express.Router();

debtLogRouter.get('/getListDebtLog', getListDebtLog);
