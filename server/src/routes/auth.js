import express from 'express';
import { confirmPassword, getInfo, getToolByUser, sendOtpForgotPassword, sendOtpSignup, signIn, signUp } from '@controller';
import { authMiddleware, permissionMiddleware } from '@middleware';
require('dotenv').config();

export const authRouter = express.Router();

authRouter.get('/getInfo', authMiddleware, getInfo);
authRouter.get('/getToolByUser', authMiddleware, permissionMiddleware, getToolByUser);
authRouter.post('/signin', signIn);
authRouter.post('/sendOtpSignup', sendOtpSignup);
authRouter.post('/signup', signUp);
authRouter.post('/sendOtpForgotPassword', sendOtpForgotPassword);
authRouter.post('/confirmPassword', confirmPassword);
