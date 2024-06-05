import {
  createBillMd,
  createDebitMd,
  detailApartmentMd,
  detailBillMd,
  detailDebitMd,
  detailElectricWaterMd,
  detailServiceMd,
  listServiceMd,
  listVehicleMd,
  updateBillMd
} from '@models';
import { generateRandomString } from '@utils';
import moment from 'moment';

export class Debt {
  constructor({ projectId, apartmentId, serviceId, apartment, service, vehicleType, month, from, to, deadline, discount, serviceType }) {
    this.projectId = projectId;
    this.apartmentId = apartmentId;
    this.serviceId = serviceId;
    this.apartment = apartment;
    this.service = service;
    this.month = month;
    this.discount = discount;
    this.vehicleType = vehicleType;
    this.serviceType = serviceType;
    this.from = moment(from);
    this.to = moment(to);
    this.deadline = moment(deadline).format('YYYY-MM-DD');
  }

  async setUp() {
    if (!this.apartment)
      this.apartment = await detailApartmentMd({ _id: this.apartmentId, project: this.projectId }, [{ path: 'owner', select: 'fullName' }]);
    if (!this.service && this.serviceType !== 4)
      this.service = await detailServiceMd({ _id: this.serviceId, project: this.projectId }, [{ path: 'price', select: 'prices recipe' }]);
    this.prices = this.service?.price?.prices;
    this.bill = await detailBillMd({ month: this.month, project: this.projectId, apartment: this.apartmentId });
    this.dateUse = this.to.diff(this.from, 'days') + 1;
  }

  async valid() {
    if (!this.service) return { status: false, mess: 'Không tìm thấy dịch vụ' };
    if (!this.apartment) return { serviceInfo: this.service, status: false, mess: 'Không tìm thấy căn hộ' };
    if (this.dateUse <= 0) return { serviceInfo: this.service, status: false, mess: 'Ngày sử dụng không hợp lệ' };
    if (this.bill && this.bill.status !== 1) return { status: false, mess: `Bảng kê căn hộ tháng ${this.month} đã được duyệt` };
    return { status: true };
  }

  async calcServiceCharge() {
    const quantity = this.apartment.area;
    const price = this.prices[0]?.amount;
    const cost = price * quantity;
    return { quantity, price, cost };
  }

  async calcOtherFees() {
    const quantity = 1;
    const price = this.prices[0]?.amount;
    const cost = price * quantity;
    return { quantity, price, cost };
  }

  async calcElectricWaterFees() {
    const type = this.serviceType === 2 ? 1 : 2;
    const electricWater = await detailElectricWaterMd({
      project: this.projectId,
      apartment: this.apartment._id,
      month: this.month,
      type
    });
    if (!electricWater) return { serviceInfo: this.service, mess: `Căn hộ chưa chốt ${type === 1 ? 'điện' : 'nước'} tháng ${this.month}` };
    if (this.service.price?.recipe === 1) {
      const quantity = electricWater.afterNumber - electricWater.beforeNumber;
      const price = this.prices[0]?.amount;
      const cost = price * quantity;
      return { quantity, price, cost };
    } else {
      let cost = 0;
      const number = electricWater.afterNumber - electricWater.beforeNumber;
      const prices = [];
      let check = false;
      this.prices.forEach((p, index) => {
        if (!check) {
          let total = 0;
          if (number > p.to) {
            if (index === this.prices.length - 1) total = p.amount * (number - p.from);
            else total = p.amount * (p.to - p.from);
          } else {
            total = p.amount * (number - p.from);
            check = true;
          }
          cost += total;
          prices.push({ ...p, total });
        }
      });
      const data = { beforeNumber: electricWater.beforeNumber, afterNumber: electricWater.afterNumber, prices };
      return { quantity: 1, price: cost, cost, data };
    }
  }

  async calcVehicleFees() {
    let cost = 0;
    const data = [];
    const services = await listServiceMd(
      {
        apartments: { $elemMatch: { $eq: this.apartmentId } },
        status: 1,
        type: this.serviceType,
        project: this.projectId
      },
      false,
      false,
      [{ path: 'price', select: 'prices recipe' }]
    );
    if (services.length === 0)
      return { serviceInfo: this.service, mess: `Căn hộ không có phương tiện nào hoạt động trong tháng ${this.month}` };
    else {
      for (const service of services) {
        const vehicles = await listVehicleMd({ apartment: apartmentId, status: 1, service: service._id });
        if (vehicles.length === 0)
          return { serviceInfo: this.service, mess: `Căn hộ không có phương tiện nào hoạt động trong tháng ${this.month}` };
        for (const vehicle of vehicles) {
          const amount = service.price?.prices?.[0]?.amount;
          cost += amount;
          data.push({ name: `${service?.name} - ${vehicle?.licensePlate}`, amount });
        }
      }
    }
    return { quantity: 1, price: cost, cost, data };
  }

  async run() {
    await this.setUp();
    const { status: statusValid, mess: messValid } = await this.valid();
    if (!statusValid) return { status: statusValid, mess: messValid };
    const checkDebit = await detailDebitMd({
      project: this.projectId,
      apartment: this.apartment._id,
      month: this.month,
      serviceType: this.serviceType
    });
    if (checkDebit)
      return { serviceInfo: this.service, status: false, mess: `Dịch vụ này của căn hộ đã được lên công nợ tháng ${this.month}` };
    const object = {
      project: this.projectId,
      apartment: this.apartment._id,
      month: this.month,
      serviceName: this.serviceType !== 4 ? this.service?.name : `Dịch vụ phương tiện tháng ${this.month}`,
      serviceType: this.serviceType,
      prices: this.serviceType !== 4 ? this.prices : [],
      fromDate: moment(this.from).format('YYYY-MM-DD'),
      toDate: moment(this.to).format('YYYY-MM-DD'),
      discount: this.discount
    };
    let value;
    if (this.serviceType === 1) value = await this.calcServiceCharge();
    else if ([2, 3].includes(this.serviceType)) value = await this.calcElectricWaterFees();
    else if (this.serviceType === 4) value = await this.calcVehicleFees();
    else value = await this.calcOtherFees();
    const { mess, quantity, price, cost } = value;
    if (mess) return { status: false, mess };
    if (cost < this.discount) return { serviceInfo: this.service, status: false, mess: `Giảm trừ không thể lớn hơn thành tiền` };
    const summary = cost - this.discount;
    const debit = await createDebitMd({ ...object, quantity, price, cost, summary });
    if (!this.bill) {
      await createBillMd({
        project: this.projectId,
        apartment: this.apartment._id,
        month: this.month,
        amount: summary,
        code: `${this.month}_${(generateRandomString(4))}_${Date.now()}`,
        deadline: moment(this.deadline).format('YYYY-MM-DD'),
        status: 1,
        customerInfo: { name: this.apartment.owner?.fullName },
        debits: [debit._id]
      });
    } else await updateBillMd({ _id: this.bill._id }, { amount: this.bill.amount + summary, $pull: { debits: debit._id } });
    return { serviceInfo: this.service, status: true };
  }
}
