import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TemplateMd extends ModelBase {
  by;
  updateBy;
  type;
  subject;
  code;
  content;
  description;
  status;
  deletedAt;
}

TemplateMd.init('Template', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  type: { type: Number, required: true, enum: [1, 2, 3], description: '1: mẫu xác nhận đăng ký, 2: mẫu quên mật kkhẩu' },
  code: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListTemplateMd = (where, page, limit, populates, sort, attr) => {
  return TemplateMd.find({ where, page, limit, sort, attr, populates });
};

export const countListTemplateMd = (where) => {
  return TemplateMd.count({ where });
};

export const getDetailTemplateMd = (where, populates, attr) => {
  return TemplateMd.findOne({ where, attr, populates });
};

export const addTemplateMd = (attr) => {
  return TemplateMd.create({ attr });
};

export const updateTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const deleteTemplateMd = (where) => {
  return TemplateMd.delete({ where });
};
