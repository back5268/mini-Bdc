import { deleteDebit, getListDebit } from '@controller';
import express from 'express';

export const debitRouter = express.Router();

debitRouter.get('/getListDebit', getListDebit);
debitRouter.delete('/deleteDebit', deleteDebit);
