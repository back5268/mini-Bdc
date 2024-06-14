import { addResident, addUser, deleteUser, detailUser, getListResident, getListUser, resetPassword, updateUser } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const userRouter = express.Router();

userRouter.get('/getListUser', getListUser);
userRouter.get('/getListResident', getListResident);
userRouter.get('/detailUser', detailUser);
userRouter.delete('/deleteUser', deleteUser);
userRouter.post('/addUser', upload.single('avatar'), addUser);
userRouter.post('/addResident', upload.single('avatar'), addResident);
userRouter.put('/resetPassword', resetPassword);
userRouter.put('/updateUser', upload.single('avatar'), updateUser);
