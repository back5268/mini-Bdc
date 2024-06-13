import { addResident, getListResident } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const residentRouter = express.Router();

residentRouter.get('/getListResident', getListResident);
residentRouter.post('/addResident', upload.single('avatar'), addResident);
