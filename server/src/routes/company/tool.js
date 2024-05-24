import { getListTool, updateTool } from '@controller';
import express from 'express';

export const toolRouter = express.Router();

toolRouter.get('/getListTool', getListTool);
toolRouter.put('/updateTool', updateTool);
