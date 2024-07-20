import { addProject, deleteProject, detailProject, getListProject, informationProject, updateProject } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const projectzRouter = express.Router();

projectzRouter.get('/getListProject', getListProject);
projectzRouter.get('/detailProject', detailProject);
projectzRouter.get('/informationProject', informationProject);
projectzRouter.delete('/deleteProject', deleteProject);
projectzRouter.post(
  '/addProject',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  addProject
);
projectzRouter.put(
  '/updateProject',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  updateProject
);
