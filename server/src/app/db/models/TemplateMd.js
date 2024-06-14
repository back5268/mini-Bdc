import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TemplateMd extends ModelBase {
  by;
  updateBy;
  type;
  code;
  subject;
  content;
  description;
  status;
  deletedAt;
}

TemplateMd.init('Template', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Quên mật khẩu, 2: Thông báo, 3: Bảng kê, 4: Phiếu thu, 5: Phiếu chi'
  },
  code: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const listTemplateMd = (where, page, limit, populates, attr, sort) => {
  return TemplateMd.find({ where, page, limit, populates, attr, sort });
};

export const countTemplateMd = (where) => {
  return TemplateMd.count({ where });
};

export const detailTemplateMd = (where, populates, attr) => {
  return TemplateMd.findOne({ where, populates, attr });
};

export const createTemplateMd = (attr) => {
  return TemplateMd.create({ attr });
};

export const updateTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const updateManyTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const deleteTemplateMd = (where) => {
  return TemplateMd.delete({ where });
};
