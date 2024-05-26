import express from 'express';
import { projectMiddleware } from '@middleware';
import { priceRouter } from './price';
import { serviceRouter } from './service';
import { VehicleRouter } from './vehicle';

export const projectRouter = express.Router();

projectRouter.use(projectMiddleware);
projectRouter.use('/prices', priceRouter);
projectRouter.use('/services', serviceRouter);
projectRouter.use('/vehicles', VehicleRouter);
