import express from 'express';
import { authMiddleware, permissionMiddleware, projectMiddleware } from '@middleware';
import { priceRouter } from './price';

export const projectzRouter = express.Router();

projectzRouter.use(authMiddleware, permissionMiddleware, projectMiddleware);
projectzRouter.use('/prices', priceRouter);
