import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class PriceMd extends ModelBase {
  project;
  by;
  updateBy;
  name;
  code;
  description;
  recipe;
  prices;
  status;
  serviceType;
  deletedAt;
}

PriceMd.init('Price', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  recipe: { type: Number, enum: [1, 2], required: true, description: '1: 1 giá, 2: Lũy tiến' },
  prices: [{ from: { type: Number }, to: { type: Number }, amount: { type: Number } }],
  status: { type: Number, enum: [0, 1], default: 1 },
  serviceType: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Phí dịch vụ, 2: Phí điện, 3: Phí nước, 4: Phí phương tiện, 5: Phí khác'
  },
  deletedAt: { type: Date }
});

export const listPriceMd = (where, page, limit, populates, attr, sort) => {
  return PriceMd.find({ where, page, limit, populates, attr, sort });
};

export const countPriceMd = (where) => {
  return PriceMd.count({ where });
};

export const detailPriceMd = (where, populates, attr) => {
  return PriceMd.findOne({ where, populates, attr });
};

export const createPriceMd = (attr) => {
  return PriceMd.create({ attr });
};

export const updatePriceMd = (where, attr) => {
  return PriceMd.update({ where, attr });
};

export const updateManyPriceMd = (where, attr) => {
  return PriceMd.update({ where, attr });
};

export const deletePriceMd = (where) => {
  return PriceMd.delete({ where });
};
