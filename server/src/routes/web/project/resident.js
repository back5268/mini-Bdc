<<<<<<< HEAD
import { addResident, deleteResident, getListResident, updateResident } from '@controller';
=======
import { addResident, deleteResident, detailResident, getListResident, updateResident } from '@controller';
>>>>>>> 4e86a0ba91bc9f3caef34d9ff8f4b05128807de2
import { upload } from '@lib/multer';
import express from 'express';

export const residentRouter = express.Router();

residentRouter.get('/getListResident', getListResident);
<<<<<<< HEAD
residentRouter.post('/addResident', upload.single('avatar'), addResident);
residentRouter.put('/updateResident', upload.single('avatar'), updateResident);
residentRouter.delete('/deleteResident', deleteResident);
=======
residentRouter.get('/detailResident', detailResident);
residentRouter.delete('/deleteResident', deleteResident);
residentRouter.post('/addResident', upload.single('avatar'), addResident);
residentRouter.put('/updateResident', upload.single('avatar'), updateResident);
>>>>>>> 4e86a0ba91bc9f3caef34d9ff8f4b05128807de2
