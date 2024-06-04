import cron from 'node-cron';
export * from './debtCron'

cron.schedule('* * * * *', async () => {});
