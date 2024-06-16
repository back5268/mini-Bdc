import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class BillMd extends ModelBase {
  project;
  apartment;
  amount;
  paid;
  code;
  month;
  customerInfo;
  deadline;
  confirmDate;
  sendDate;
  status;
  receipts;
  deletedAt;
}

BillMd.init('Bill', {
  project: { type: String, required: true },
  apartment: { type: ObjectId, ref: 'Apartment', required: true },
  amount: { type: Number, required: true },
  paid: { type: Number, default: 0 },
  code: { type: String, required: true },
  month: { type: String, required: true },
  customerInfo: { type: Object, required: true },
  deadline: { type: Date },
  confirmDate: { type: Date },
  sendDate: { type: Date },
  status: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Chờ duyệt, 2: Chờ gửi, 3: Chờ thanh toán, 4: Đã thanh toán, 5: Quá hạn thanh toán'
  },
  receipts: [{ type: String }],
  deletedAt: { type: Date }
});

export const listBillMd = (where, page, limit, populates, attr, sort) => {
  return BillMd.find({ where, page, limit, populates, attr, sort });
};

export const countBillMd = (where) => {
  return BillMd.count({ where });
};

export const detailBillMd = (where, populates, attr) => {
  return BillMd.findOne({ where, populates, attr });
};

export const createBillMd = (attr) => {
  return BillMd.create({ attr });
};

export const updateBillMd = (where, attr) => {
  return BillMd.update({ where, attr });
};

export const updateManyBillMd = (where, attr) => {
  return BillMd.update({ where, attr });
};

export const deleteBillMd = (where) => {
  return BillMd.delete({ where });
};
