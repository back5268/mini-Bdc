import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ReceiptMd extends ModelBase {
  project;
  by;
  payer;
  apartment;
  bill;
  type;
  paymentType;
  amount;
  note;
  coin;
  files;
  deletedAt;
}

ReceiptMd.init('Receipt', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  payer: { type: ObjectId, ref: 'User', required: true },
  apartment: { type: ObjectId, ref: 'Apartment', required: true },
  bill: { type: ObjectId },
  type: { type: Number, enum: [1, 2, 3], description: '1: Phiếu thu, 2: Phiếu hoàn tiền, 3: Phiếu hạch toán', required: true },
  paymentType: { type: Number, enum: [1, 2, 3], description: '1: Chuyển khoản, 2: Tiền mặt, 3: Hạch toán tự động', required: true },
  amount: { type: Number, required: true },
  note: { type: String },
  coin: { type: ObjectId },
  files: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã hủy, 1: Hoạt động' },
  deletedAt: { type: Date }
});

export const listReceiptMd = (where, page, limit, populates, attr, sort) => {
  return ReceiptMd.find({ where, page, limit, populates, attr, sort });
};

export const countReceiptMd = (where) => {
  return ReceiptMd.count({ where });
};

export const detailReceiptMd = (where, populates, attr) => {
  return ReceiptMd.findOne({ where, populates, attr });
};

export const createReceiptMd = (attr) => {
  return ReceiptMd.create({ attr });
};

export const updateReceiptMd = (where, attr) => {
  return ReceiptMd.update({ where, attr });
};

export const updateManyReceiptMd = (where, attr) => {
  return ReceiptMd.update({ where, attr });
};

export const deleteReceiptMd = (where) => {
  return ReceiptMd.delete({ where });
};
