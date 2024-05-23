import { adminRouter } from './admin';
import { authRouter } from './auth';
import { infoRouter } from './info';

export const routes = (app) => {
  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);
  app.use('/info', infoRouter);
  app.get('/', async (req, res) => {
    res.json('Welcome to mini-Bdc!');
  });
};
