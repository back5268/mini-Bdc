import { addProject, deleteProject, detailProject, getListProject, updateProject } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const projectRouter = express.Router();

projectRouter.get('/getListProject', getListProject);
projectRouter.get('/detailProject', detailProject);
projectRouter.delete('/deleteProject', deleteProject);
projectRouter.post(
  '/addProject',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  addProject
);
projectRouter.put(
  '/updateProject',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  updateProject
);
