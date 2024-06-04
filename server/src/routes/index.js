import { appRouter } from './app';
import { authRouter } from './auth';
import { infoRouter } from './info';
import { webRouter } from './web';

export const routes = (app) => {
  app.use('/web', webRouter);
  app.use('/app', appRouter);
  app.use('/auth', authRouter);
  app.use('/info', infoRouter);
  app.get('/', async (req, res) => {
    res.json('Welcome to mini-Bdc!');
  });
};
