import express from 'express';
import { projectMiddleware } from '@middleware';
import { priceRouter } from './price';
import { serviceRouter } from './service';
import { vehicleRouter } from './vehicle';
import {apartmentGroupRouter} from "./apartmentGroup";
import { electricWaterRouter } from './electricWater';

export const projectRouter = express.Router();

projectRouter.use(projectMiddleware);
projectRouter.use('/prices', priceRouter);
projectRouter.use('/services', serviceRouter);
projectRouter.use('/vehicles', vehicleRouter);
projectRouter.use('/apartment-groups', apartmentGroupRouter);
projectRouter.use('/electric-waters', electricWaterRouter);
