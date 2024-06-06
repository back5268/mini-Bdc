import { addRequest, deleteRequest, detailRequest, getListRequest, updateRequest } from '@controller';
import express from 'express';

export const requestRouter = express.Router();

requestRouter.get('/getListRequest', getListRequest);
requestRouter.get('/detailRequest', detailRequest);
requestRouter.delete('/deleteRequest', deleteRequest);
requestRouter.post('/addRequest', addRequest);
requestRouter.put('/updateRequest', updateRequest);
