import express from 'express';
import { confirmPassword, getInfo, sendOtpForgotPassword, signIn } from '@controller';
import { authMiddleware, permissionMiddleware } from '@middleware';
require('dotenv').config();

export const authRouter = express.Router();

authRouter.get('/getInfo', authMiddleware, permissionMiddleware, getInfo);
authRouter.post('/signin', signIn);
authRouter.post('/sendOtpForgotPassword', sendOtpForgotPassword);
authRouter.post('/confirmPassword', confirmPassword);
