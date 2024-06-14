import { addApartment, deleteApartment, detailApartment, getListApartment, updateApartment } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';
export const apartmentRouter = express.Router();

apartmentRouter.get('/getListApartment', getListApartment);
apartmentRouter.get('/detailApartment', detailApartment);
apartmentRouter.delete('/deleteApartment', deleteApartment);
apartmentRouter.post('/addApartment', upload.fields([{ name: 'images', maxCount: 10 }]), addApartment);
apartmentRouter.put('/updateApartment', upload.fields([{ name: 'images', maxCount: 10 }]), updateApartment);
