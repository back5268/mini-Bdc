import { addDepartment, deleteDepartment, detailDepartment, getListDepartment, updateDepartment } from '@controller';
import express from 'express';

export const departmentRouter = express.Router();

departmentRouter.get('/getListDepartment', getListDepartment);
departmentRouter.get('/detailDepartment', detailDepartment);
departmentRouter.delete('/deleteDepartment', deleteDepartment);
departmentRouter.post('/addDepartment', addDepartment);
departmentRouter.put('/updateDepartment', updateDepartment);
