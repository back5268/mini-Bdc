import {
  createBillMd,
  createDebitMd,
  detailApartmentMd,
  detailBillMd,
  detailDebitMd,
  detailElectricWaterMd,
  detailProjectMd,
  detailServiceMd,
  listServiceMd,
  listVehicleMd,
  updateBillMd
} from '@models';
import { generateRandomString } from '@utils';
import moment from 'moment';

export class Debt {
  constructor({ projectId, apartmentId, apartment, month, from, to, deadline, discount, serviceType }) {
    this.projectId = projectId;
    this.apartmentId = apartmentId;
    this.apartment = apartment;
    this.month = Number(month);
    this.discount = discount;
    this.serviceType = serviceType;
    this.from = moment(from);
    this.to = moment(to);
    this.deadline = moment(deadline).format('YYYY-MM-DD');
  }

  async setUp() {
    if (!this.apartment)
      this.apartment = await detailApartmentMd({ _id: this.apartmentId, project: this.projectId }, [{ path: 'owner', select: 'fullName' }]);
    this.bill = await detailBillMd({ month: this.month, project: this.projectId, apartment: this.apartmentId });
    this.dateUse = this.to.diff(this.from, 'days') + 1;
  }

  async valid() {
    if (!this.apartment) return { status: false, mess: 'Không tìm thấy căn hộ' };
    if (!this.apartment.owner) return { status: false, mess: 'Căn hộ không có chủ hộ' };
    if ([1, 2, 3, 5].includes(this.serviceType)) {
      this.service = await detailServiceMd({
        apartments: { $elemMatch: { $eq: this.apartment._id } },
        status: 1,
        type: this.serviceType,
        project: this.projectId
      });
      if (!this.service) return { status: false, mess: 'Không tìm thấy dịch vụ' };
      this.prices = this.service.prices;
    }
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
      project: this.projectId,
      apartment: this.apartment._id,
      month: this.month,
      type
    });
    if (!electricWater) return { mess: `Căn hộ chưa chốt ${type === 1 ? 'điện' : 'nước'} tháng ${this.month}` };
    const quantity = electricWater.afterNumber - electricWater.beforeNumber;
    if (this.service.price?.recipe === 1) {
      const price = this.prices[0]?.amount;
      const cost = price * quantity;
      return { quantity, price, cost };
    } else {
      let cost = 0;
      const number = electricWater.afterNumber - electricWater.beforeNumber + 1;
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
      return { quantity, price: cost, cost, data };
    }
  }

  async calcVehicleFees() {
    let cost = 0;
    const data = [];
    const services = await listServiceMd({
      apartments: { $elemMatch: { $eq: this.apartmentId } },
      status: 1,
      type: this.serviceType,
      project: this.projectId
    });
    let isVehicle = false;
    if (services.length === 0) return { mess: `Căn hộ chưa có dịch vụ phương tiện` };
    else {
      for (const service of services) {
        const vehicles = await listVehicleMd({ apartment: this.apartmentId, status: 1, type: service.vehicleType });
        if (vehicles.length === 0) continue;
        for (const vehicle of vehicles) {
          const amount = service.prices?.[0]?.amount;
          cost += amount;
          isVehicle = true;
          data.push({ name: `${service?.name} - ${vehicle?.licensePlate}`, amount });
        }
      }
    }
    if (!isVehicle) return { mess: 'Căn hộ không có phương tiện nào hoạt động' };
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
    if (checkDebit) return { status: false, mess: `Dịch vụ này của căn hộ đã được lên công nợ tháng ${this.month}` };
    const object = {
      project: this.projectId,
      apartment: this.apartment._id,
      month: this.month,
      serviceName: this.serviceType === 4 ? `Phí phương tiện tháng ${this.month}` : this.service.name,
      serviceType: this.serviceType,
      prices: this.serviceType === 4 ? [] : this.prices,
      fromDate: moment(this.from).format('YYYY-MM-DD'),
      toDate: moment(this.to).format('YYYY-MM-DD'),
      discount: this.discount
    };
    let value;
    if (this.serviceType === 1) value = await this.calcServiceCharge();
    else if ([2, 3].includes(this.serviceType)) value = await this.calcElectricWaterFees();
    else if (this.serviceType === 4) value = await this.calcVehicleFees();
    else value = await this.calcOtherFees();
    const { mess, quantity, price, cost, data } = value;
    if (mess) return { status: false, mess };
    if (cost < this.discount) return { status: false, mess: `Giảm trừ không thể lớn hơn thành tiền` };
    const summary = cost - this.discount;
    if (!this.bill) {
      const project = await detailProjectMd({ id: this.projectId })
      this.bill = await createBillMd({
        project: this.projectId,
        apartment: this.apartment._id,
        month: this.month,
        amount: summary,
        code: `${project?.code}_${this.apartment?.code}_${this.month}}`,
        deadline: moment(this.deadline).format('YYYY-MM-DD'),
        status: 1,
        customerInfo: { name: this.apartment.owner?.fullName }
      });
    } else await updateBillMd({ _id: this.bill._id }, { amount: this.bill.amount + summary });
    await createDebitMd({ ...object, quantity, price, cost, summary, data, bill: this.bill?._id });
    return { status: true };
  }
}
