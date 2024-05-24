import { addProject, deleteProject, detailProject, getListProject, updateProject } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const projectzRouter = express.Router();

projectzRouter.get('/getListProject', getListProject);
projectzRouter.get('/detailProject', detailProject);
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
