import express from 'express';
import { userRouter } from './user';
import { templateRouter } from './template';
import { permissionRouter } from './permission';
import { authMiddleware, permissionMiddleware } from '@middleware';
import { toolRouter } from './tool';
import { departmentRouter } from './department';
import { projectRouter } from './project';

export const companyRouter = express.Router();

companyRouter.use(authMiddleware, permissionMiddleware);
companyRouter.use('/users', userRouter);
companyRouter.use('/templates', templateRouter);
companyRouter.use('/permissions', permissionRouter);
companyRouter.use('/tools', toolRouter);
companyRouter.use('/departments', departmentRouter);
companyRouter.use('/projects', projectRouter);
