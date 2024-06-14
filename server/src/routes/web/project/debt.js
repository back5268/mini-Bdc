import { calculatorDebt, getListDebit, getListDebt, getListDebtLog } from '@controller';
import express from 'express';

export const debtLogRouter = express.Router();

debtLogRouter.get('/getListDebtLog', getListDebtLog);
debtLogRouter.get('/getListDebit', getListDebit);
debtLogRouter.get('/getListDebt', getListDebt);
debtLogRouter.post('/calculatorDebt', calculatorDebt);
