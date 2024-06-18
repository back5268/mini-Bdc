import { addVehicle, deleteVehicle, detailVehicle, getListVehicle, updateVehicle } from '@controller';
import { upload } from '@lib/multer';
import { projectMiddleware } from '@middleware';
import express from 'express';

export const vehicleRouter = express.Router();

vehicleRouter.get('/getListVehicle', getListVehicle);
vehicleRouter.get('/detailVehicle', detailVehicle);
vehicleRouter.delete('/deleteVehicle', deleteVehicle);
vehicleRouter.post('/addVehicle', upload.fields([{ name: 'files', maxCount: 10 }]), projectMiddleware, addVehicle);
vehicleRouter.put('/updateVehicle', upload.fields([{ name: 'files', maxCount: 10 }]), updateVehicle);
