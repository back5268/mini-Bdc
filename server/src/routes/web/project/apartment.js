// import { addApartment, deleteApartment, detailApartment, getListApartment, updateApartment, updateStatusApartment } from '@controller';

import { addApartment, deleteApartment, detailApartment, getListApartment, updateApartment, updateStatusApartment } from '@controller';
import express from 'express';
export const apartmentRouter = express.Router();

apartmentRouter.get('/getListApartment', getListApartment);
apartmentRouter.get('/detailApartment', detailApartment);
apartmentRouter.delete('/deleteApartment', deleteApartment);
apartmentRouter.post('/addApartment', addApartment);
apartmentRouter.put('/updateApartment', updateApartment);
apartmentRouter.put('/updateStatusApartment', updateStatusApartment);