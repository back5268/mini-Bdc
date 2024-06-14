import { addResident, deleteResident, detailResident, getListResident, updateResident } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const residentRouter = express.Router();

residentRouter.get('/getListResident', getListResident);
residentRouter.get('/detailResident', detailResident);
residentRouter.delete('/deleteResident', deleteResident);
residentRouter.post('/addResident', upload.single('avatar'), addResident);
residentRouter.put('/updateResident', upload.single('avatar'), updateResident);
