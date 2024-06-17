import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class DebtLogMd extends ModelBase {
  project;
  by;
  title;
  month;
  deadline;
  apartments;
  services;
  success;
  error;
  status;
  detail;
  deletedAt;
}

export const DebtLog = DebtLogMd.init('DebtLog', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  month: { type: Number, required: true },
  deadline: { type: Date, required: true },
  apartments: [{ type: String, required: true }],
  services: [{ type: Object, required: true }],
  success: { type: Number, default: 0 },
  error: { type: Number, default: 0 },
  status: { type: Number, enum: [1, 2], description: '1: Đang xử lý, 2: Đã xử lý', required: true },
  detail: [
    {
      apartmentId: { type: String, required: true },
      serviceType: { type: Number, required: true },
      discount: { type: Number, required: true },
      from: { type: Date, required: true },
      to: { type: Date, required: true },
      mess: { type: String },
      status: { type: Number, enum: [1, 2], description: '1: Thành công, 2: Thất bại', required: true }
    }
  ],
  deletedAt: { type: Date }
});

export const listDebtLogMd = (where, page, limit, populates, attr, sort) => {
  return DebtLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countDebtLogMd = (where) => {
  return DebtLogMd.count({ where });
};

export const detailDebtLogMd = (where, populates, attr) => {
  return DebtLogMd.findOne({ where, populates, attr });
};

export const createDebtLogMd = (attr) => {
  return DebtLogMd.create({ attr });
};

export const updateDebtLogMd = (where, attr) => {
  return DebtLogMd.update({ where, attr });
};

export const updateManyDebtLogMd = (where, attr) => {
  return DebtLogMd.update({ where, attr });
};

export const deleteDebtLogMd = (where) => {
  return DebtLogMd.delete({ where });
};
