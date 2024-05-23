import { addTemplate, deleteTemplate, detailTemplate, getListTemplate, updateTemplate } from '@controller';
import express from 'express';

export const templateRouter = express.Router();

templateRouter.get('/getListTemplate', getListTemplate);
templateRouter.get('/detailTemplate', detailTemplate);
templateRouter.delete('/deleteTemplate', deleteTemplate);
templateRouter.post('/addTemplate', addTemplate);
templateRouter.put('/updateTemplate', updateTemplate);
