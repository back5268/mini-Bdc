import { ArrayRedis } from '@lib/ioredis';
import { detailServiceMd, updateDebtLogMd } from '@models';
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

      if (serviceType === 4) {
        const debt = new Debt({ projectId, apartmentId, month, from, to, deadline, discount, serviceType });
        value = await debt.run();
      } else {
        const service = await detailServiceMd({
          apartments: { $elemMatch: { $eq: apartmentId } },
          status: 1,
          type: serviceType,
          project: projectId
        }, [{ path: 'price', select: 'prices recipe' }]);
        if (!service) {
          value = { status: false, mess: 'Không tìm thấy dịch vụ phát sinh của căn hộ' };
        }
        const debt = new Debt({ projectId, apartmentId, service, month, from, to, deadline, discount, serviceType });
        value = await debt.run();
      }
      const { status, mess, serviceInfo } = value;
      detail.push({ from, to, mess, status: status ? 1 : 0, serviceInfo: { serviceType, name: serviceInfo?.name } });
      if (status) success += 1;
      else error += 1;
    }
  }
  await updateDebtLogMd({ _id: debtLogId }, { error, success, detail, status: 2 });
  ioSk.emit(`calculatorDebt${projectId}`, { time: Date.now() });
};
