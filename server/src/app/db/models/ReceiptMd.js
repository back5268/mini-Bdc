import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ReceiptMd extends ModelBase {
  project;
  by;
  payer;
  apartment;
  type;
  paymentType;
  amount;
  note;
  files;
  deletedAt;
}

ReceiptMd.init('Receipt', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  payer: { type: ObjectId, ref: 'User', required: true },
  apartment: { type: String, required: true },
  type: { type: Number, enum: [1, 2], description: '1: Phiếu thu, 2: Phiếu hoàn tiền', required: true },
  paymentType: { type: Number, enum: [1, 2], description: '1: Chuyển khoản, 2: Tiền mặt', required: true },
  amount: { type: Number, required: true },
  note: { type: String },
  files: [{ type: String }],
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
