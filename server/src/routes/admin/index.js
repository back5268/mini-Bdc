import express from 'express';
import { userRouter } from './user';
import { templateRouter } from './template';
import { permissionRouter } from './permission';
import { authMiddleware } from '@middleware';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/users', userRouter);
adminRouter.use('/templates', templateRouter);
adminRouter.use('/permissions', permissionRouter);
