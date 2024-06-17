import { calculatorDebt, getListDebt, getListDebtLog } from '@controller';
import express from 'express';

export const debtLogRouter = express.Router();

debtLogRouter.get('/getListDebtLog', getListDebtLog);
debtLogRouter.get('/getListDebt', getListDebt);
debtLogRouter.post('/calculatorDebt', calculatorDebt);
