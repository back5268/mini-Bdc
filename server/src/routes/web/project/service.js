import { addService, checkApartment, deleteService, detailService, getListService, updateService, updateStatusService } from '@controller';
import express from 'express';

export const serviceRouter = express.Router();

serviceRouter.get('/getListService', getListService);
serviceRouter.get('/detailService', detailService);
serviceRouter.get('/checkApartment', checkApartment);
serviceRouter.delete('/deleteService', deleteService);
serviceRouter.post('/addService', addService);
serviceRouter.put('/updateService', updateService);
serviceRouter.put('/updateStatusService', updateStatusService);
