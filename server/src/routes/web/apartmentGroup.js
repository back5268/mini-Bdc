import { addApartmentGroup, deleteApartmentGroup, detailApartmentGroup, getListApartmentGroup, updateApartmentGroup, updateStatusApartmentGroup } from '@controller';
import express from 'express';
export const apartmentGroupRouter = express.Router();
apartmentGroupRouter.get('/getListApartmentGroup', getListApartmentGroup);
apartmentGroupRouter.get('/detailApartmentGroup', detailApartmentGroup);
apartmentGroupRouter.delete('/deleteApartmentGroup', deleteApartmentGroup);
apartmentGroupRouter.post('/addApartmentGroup', addApartmentGroup);
apartmentGroupRouter.put('/updateApartmentGroup', updateApartmentGroup);
apartmentGroupRouter.put('/updateStatusApartmentGroup', updateStatusApartmentGroup);