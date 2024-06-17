import { ArrayRedis } from '@lib/ioredis';
import { updateDebtLogMd } from '@models';
import { Debt } from '@repository/debtRepo';
import { ioSk } from 'src';

export const debtQueue = new ArrayRedis('debtQueue');
debtQueue.callbackCron = async (data) => {
  const { debtLogId, projectId, month, deadline, services, apartments } = data;
  let error = 0,
    success = 0,
    detail = [];
  for (const service of services) {
    for (const apartmentId of apartments) {
      let value = {};
      const serviceType = service.type;
      const from = service.from;
      const to = service.to;
      const discount = service.discount;
      const debt = new Debt({ projectId, apartmentId, month, from, to, deadline, discount, serviceType });
      value = await debt.run();
      const { status, mess } = value;
      detail.push({ from, to, discount, mess, status: status ? 1 : 0, serviceType, apartmentId });
      if (status) success += 1;
      else error += 1;
    }
  }
  await updateDebtLogMd({ _id: debtLogId }, { error, success, detail, status: 2 });
  ioSk.emit(`calculatorDebt${projectId}`, { time: Date.now() });
};
