import { companyRouter } from './company';
import { authRouter } from './auth';
import { infoRouter } from './info';
import { projectzRouter } from './project';

export const routes = (app) => {
  app.use('/admin', companyRouter);
  app.use('/admin', projectzRouter);
  app.use('/auth', authRouter);
  app.use('/info', infoRouter);
  app.get('/', async (req, res) => {
    res.json('Welcome to mini-Bdc!');
  });
};
