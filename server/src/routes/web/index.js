import { authMiddleware, permissionMiddleware } from '@middleware';
import express from 'express';
import { departmentRouter } from './department';
import { permissionRouter } from './permission';
import { projectRouter } from './project';
import { projectzRouter } from './projectz';
import { templateRouter } from './template';
import { toolRouter } from './tool';
import { userRouter } from './user';

export const webRouter = express.Router();

webRouter.use(authMiddleware, permissionMiddleware);
webRouter.use('/users', userRouter);
webRouter.use('/templates', templateRouter);
webRouter.use('/permissions', permissionRouter);
webRouter.use('/tools', toolRouter);
webRouter.use('/departments', departmentRouter);
webRouter.use('/projects', projectzRouter);
webRouter.use('/', projectRouter);
