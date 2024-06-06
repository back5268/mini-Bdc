import express from 'express';
import { confirmPassword, getInfoApp, sendOtpForgotPassword, signIn } from '@controller';
import { authMiddleware } from '@middleware';

export const authRouter = express.Router();

authRouter.get('/getInfo', authMiddleware, getInfoApp);
authRouter.post('/signin', signIn);
authRouter.post('/sendOtpForgotPassword', sendOtpForgotPassword);
authRouter.post('/confirmPassword', confirmPassword);
