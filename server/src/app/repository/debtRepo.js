import {
  createBillMd,
  createDebitMd,
  detailApartmentMd,
  detailBillMd,
  detailDebitMd,
  detailElectricWaterMd,
  detailProjectMd,
  detailServiceMd,
  updateBillMd
} from '@models';
import moment from 'moment';

export class Debt {
  constructor({ projectId, apartmentId, serviceId, project, apartment, service, vehicle, month, from, to, deadline, discount }) {
    this.projectId = projectId;
    this.apartmentId = apartmentId;
    this.serviceId = serviceId;
    this.project = project;
    this.apartment = apartment;
    this.service = service;
    this.month = month;
    this.discount = discount;
    this.vehicle = vehicle;
    this.from = moment(from).format('YYYY-MM-DD');
    this.to = moment(to).format('YYYY-MM-DD');
    this.deadline = moment(deadline).format('YYYY-MM-DD');
  }

  async setUp() {
    if (!this.project) this.project = await detailProjectMd({ _id: this.projectId });
    if (!this.apartment)
      this.apartment = await detailApartmentMd({ _id: this.apartmentId, project: this.projectId }, [{ path: 'owner', select: 'fullName' }]);
    if (!this.service)
      this.service = await detailServiceMd({ _id: this.serviceId, project: this.projectId }, [{ path: 'price', select: 'prices recipe' }]);
    this.prices = this.service?.price?.prices;
    this.serviceType = this.service?.type;
    this.bill = await detailBillMd({ month: this.month, project: this.projectId, apartment: this.apartmentId });
    this.dateUse = this.to.diff(this.from, 'days') + 1;
  }

  async valid() {
    if (!this.service) return { status: false, mess: 'Không tìm thấy dịch vụ' };
    if (!this.apartment) return { status: false, mess: 'Không tìm thấy căn hộ' };
    if (!this.prices) return { status: false, mess: 'Không tìm thấy bảng giá' };
    if (this.dateUse <= 0) return { status: false, mess: 'Ngày sử dụng không hợp lệ' };
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
      project: this.project._id,
      apartment: this.apartment._id,
      month: this.month,
      type
    });
    if (!electricWater) return { mess: `Căn hộ chưa chốt ${type === 1 ? 'điện' : 'nước'} tháng ${this.month}` };
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
    if (!this.vehicle) return { mess: `Căn hộ không có phương tiện nào hoạt động trong tháng ${this.month}` };
    const quantity = 1;
    const price = this.prices[0]?.amount;
    const cost = price * quantity;
    return { quantity, price, cost };
  }

  async run() {
    await this.setUp();
    const { status: statusValid, mess: messValid } = await this.valid();
    if (!statusValid) return { status: statusValid, mess: messValid };
    const checkDebit = await detailDebitMd({
      project: this.project._id,
      apartment: this.apartment._id,
      month: this.month,
      serviceType: this.serviceType
    });
    if (checkDebit) return { status: false, mess: `Dịch vụ này của căn hộ đã được lên công nợ tháng ${this.month}` };
    const object = {
      project: this.project._id,
      apartment: this.apartment._id,
      month: this.month,
      serviceName: this.vehicle ? this.service.name + ' - ' + this.vehicle.licensePlate : this.service.name,
      serviceType: this.serviceType,
      prices: this.prices,
      fromDate: this.from,
      toDate: this.to,
      discount: this.discount
    };
    let value;
    if (this.serviceType === 1) value = await this.calcServiceCharge();
    else if ([2, 3].includes(this.serviceType)) value = await this.calcElectricWaterFees();
    else if (this.serviceType === 4) value = await this.calcVehicleFees();
    else value = await this.calcOtherFees();
    const { mess, quantity, price, cost } = value;
    if (mess) return { status: false, mess };
    if (cost < this.discount) return { status: false, mess: `Giảm trừ không thể lớn hơn thành tiền` };
    const summary = cost - this.discount;
    const debit = await createDebitMd({ ...object, quantity, price, cost, summary });
    if (!this.bill) {
      await createBillMd({
        project: this.project._id,
        apartment: this.apartment._id,
        month: this.month,
        amount: summary,
        code: '123',
        deadline: this.deadline,
        status: 1,
        customerInfo: { name: this.apartment.owner?.fullName },
        debits: [debit._id]
      });
    } else await updateBillMd({ _id: this.bill._id }, { amount: this.bill.amount + summary, $pull: { debits: debit._id } });
    return { status: true };
  }
}
