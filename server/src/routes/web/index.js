import express from 'express';
import { userRouter } from './user';
import { templateRouter } from './template';
import { permissionRouter } from './permission';
import { authMiddleware, permissionMiddleware } from '@middleware';
import { toolRouter } from './tool';
import { departmentRouter } from './department';
import { projectzRouter } from './projectz';
import { projectRouter } from './project';

export const webRouter = express.Router();

webRouter.use(authMiddleware, permissionMiddleware);
webRouter.use('/', projectRouter);
webRouter.use('/users', userRouter);
webRouter.use('/templates', templateRouter);
webRouter.use('/permissions', permissionRouter);
webRouter.use('/tools', toolRouter);
webRouter.use('/departments', departmentRouter);
webRouter.use('/projects', projectzRouter);
