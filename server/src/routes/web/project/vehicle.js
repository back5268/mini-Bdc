import { addVehicle, deleteVehicle, detailVehicle, getListVehicle, updateVehicle } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const VehicleRouter = express.Router();

VehicleRouter.get('/getListVehicle', getListVehicle);
VehicleRouter.get('/detailVehicle', detailVehicle);
VehicleRouter.delete('/deleteVehicle', deleteVehicle);
VehicleRouter.post('/addVehicle', upload.fields([{ name: 'files', maxCount: 2 }]), addVehicle);
VehicleRouter.put('/updateVehicle', upload.fields([{ name: 'files', maxCount: 2 }]), updateVehicle);
