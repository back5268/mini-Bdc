import express from 'express';
import { userRouter } from './user';
import { templateRouter } from './template';
import { permissionRouter } from './permission';
import { authMiddleware, permissionMiddleware } from '@middleware';
import { toolRouter } from './tool';
import { departmentRouter } from './department';
import { projectRouter } from './project';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware, permissionMiddleware);
adminRouter.use('/users', userRouter);
adminRouter.use('/templates', templateRouter);
adminRouter.use('/permissions', permissionRouter);
adminRouter.use('/tools', toolRouter);
adminRouter.use('/departments', departmentRouter);
adminRouter.use('/projects', projectRouter);
