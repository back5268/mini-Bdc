import { ModelBase } from '@config';

class DebitMd extends ModelBase {
  project;
  apartment;
  bill;
  service;
  month;
  name;
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
  bill: { type: String, required: true },
  service: { type: String, required: true },
  month: { type: String, required: true },
  name: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  data: { type: Object, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
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
