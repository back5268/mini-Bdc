import { addElectricWater, deleteElectricWater, getListElectricWater } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const electricWaterRouter = express.Router();

electricWaterRouter.get('/getListElectricWater', getListElectricWater);
electricWaterRouter.delete('/deleteElectricWater', deleteElectricWater);
electricWaterRouter.post('/addElectricWater', upload.single('avatar'), addElectricWater);
