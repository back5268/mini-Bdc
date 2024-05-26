import { projectMiddleware } from '@middleware';
import express from 'express';
import { apartmentRouter } from './apartment';
import { apartmentGroupRouter } from "./apartmentGroup";
import { electricWaterRouter } from './electricWater';
import { priceRouter } from './price';
import { serviceRouter } from './service';
import { vehicleRouter } from './vehicle';

export const projectRouter = express.Router();

projectRouter.use(projectMiddleware);
projectRouter.use('/prices', priceRouter);
projectRouter.use('/services', serviceRouter);
projectRouter.use('/vehicles', vehicleRouter);
projectRouter.use('/apartment-groups', apartmentGroupRouter);
projectRouter.use('/apartments', apartmentRouter);
projectRouter.use('/electric-waters', electricWaterRouter);
