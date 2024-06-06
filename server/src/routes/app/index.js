import express from 'express';
import { authRouter } from './auth';

export const appRouter = express.Router();
appRouter.use('/auth', authRouter);
