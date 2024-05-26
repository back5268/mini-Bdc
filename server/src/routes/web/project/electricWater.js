import { getListElectricWater } from '@controller';
import express from 'express';

export const electricWaterRouter = express.Router();

electricWaterRouter.get('/getListElectricWater', getListElectricWater);
