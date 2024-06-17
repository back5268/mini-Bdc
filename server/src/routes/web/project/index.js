import { projectMiddleware } from '@middleware';
import express from 'express';
import { apartmentRouter } from './apartment';
import { apartmentGroupRouter } from "./apartmentGroup";
import { debtLogRouter } from './debt';
import { electricWaterRouter } from './electricWater';
import { priceRouter } from './price';
import { residentRouter } from './resident';
import { serviceRouter } from './service';
import { vehicleRouter } from './vehicle';
import { billRouter } from './bill';
import { logRouter } from './log';
import { newsRouter } from './news';
import { optionRouter } from './option';
import { receiptRouter } from './receipt';
import { coinRouter } from './coin';
import { debitRouter } from './debit';

export const projectRouter = express.Router();

projectRouter.use(projectMiddleware);
projectRouter.use('/prices', priceRouter);
projectRouter.use('/services', serviceRouter);
projectRouter.use('/vehicles', vehicleRouter);
projectRouter.use('/apartment-groups', apartmentGroupRouter);
projectRouter.use('/apartments', apartmentRouter);
projectRouter.use('/electric-waters', electricWaterRouter);
projectRouter.use('/debts', debtLogRouter);
projectRouter.use('/bills', billRouter);
projectRouter.use('/logs', logRouter);
projectRouter.use('/news', newsRouter);
projectRouter.use('/options', optionRouter);
projectRouter.use('/residents', residentRouter);
projectRouter.use('/receipts', receiptRouter);
projectRouter.use('/coins', coinRouter);
projectRouter.use('/debits', debitRouter);
