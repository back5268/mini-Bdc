import { addNews, deleteNews, detailNews, getListNews, updateNews } from '@controller';
import express from 'express';

export const newsRouter = express.Router();
newsRouter.get('/getListNews', getListNews);
newsRouter.get('/detailNews', detailNews);
newsRouter.delete('/deleteNews', deleteNews);
newsRouter.post('/addNews', addNews);
newsRouter.put('/updateNews', updateNews);
