import { addOption, deleteOption, detailOption, getListOption, updateOption } from '@controller';
import express from 'express';

export const optionRouter = express.Router();
optionRouter.get('/getListOption', getListOption);
optionRouter.get('/detailOption', detailOption);
optionRouter.delete('/deleteOption', deleteOption);
optionRouter.post('/addOption', addOption);
optionRouter.put('/updateOption', updateOption);
