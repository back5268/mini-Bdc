import express from 'express';
import { projectMiddleware } from '@middleware';
import { priceRouter } from './price';

export const projectRouter = express.Router();

projectRouter.use(projectMiddleware);
projectRouter.use('/prices', priceRouter);
