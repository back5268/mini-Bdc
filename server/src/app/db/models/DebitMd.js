import { ModelBase } from '@config';

class DebitMd extends ModelBase {
  project;
  apartment;
  serviceName;
  bill;
  serviceType;
  month;
  prices;
  fromDate;
  toDate;
  data;
  quantity;
  price;
  discount;
  summary;
  note;
  deletedAt;
}

DebitMd.init('Debit', {
  project: { type: String, required: true },
  apartment: { type: String, required: true },
  serviceName: { type: String, required: true },
  bill: { type: String, required: true },
  serviceType: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Phí dịch vụ, 2: Phí điện, 3: Phí nước, 4: Phí phương tiện, 5: Phí khác'
  },
  month: { type: String, required: true },
  prices: [{ from: { type: Number }, to: { type: Number }, amount: { type: Number } }],
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  data: { type: Object },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  summary: { type: Number, required: true },
  note: { type: String },
  deletedAt: { type: Date }
});

export const listDebitMd = (where, page, limit, populates, attr, sort) => {
  return DebitMd.find({ where, page, limit, populates, attr, sort });
};

export const countDebitMd = (where) => {
  return DebitMd.count({ where });
};

export const detailDebitMd = (where, populates, attr) => {
  return DebitMd.findOne({ where, populates, attr });
};

export const createDebitMd = (attr) => {
  return DebitMd.create({ attr });
};

export const updateDebitMd = (where, attr) => {
  return DebitMd.update({ where, attr });
};

export const updateManyDebitMd = (where, attr) => {
  return DebitMd.update({ where, attr });
};

export const deleteDebitMd = (where) => {
  return DebitMd.delete({ where });
};
