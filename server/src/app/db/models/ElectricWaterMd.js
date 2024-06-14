import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ElectricWaterMd extends ModelBase {
  project;
  by;
  updateBy;
  apartment;
  type;
  month;
  beforeNumber;
  afterNumber;
  dateUpdate;
  image;
  deletedAt;
}

export const ElectricWater = ElectricWaterMd.init('ElectricWater', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  apartment: { type: ObjectId, ref: 'Apartment', required: true },
  type: { type: Number, enum: [1, 2], description: '1: Điện, 2: Nước', required: true },
  month: { type: Number, required: true },
  beforeNumber: { type: Number, required: true },
  afterNumber: { type: Number, required: true },
  dateUpdate: { type: Date, required: true },
  image: { type: String },
  deletedAt: { type: Date }
});

export const listElectricWaterMd = (where, page, limit, populates, attr, sort) => {
  return ElectricWaterMd.find({ where, page, limit, populates, attr, sort });
};

export const countElectricWaterMd = (where) => {
  return ElectricWaterMd.count({ where });
};

export const detailElectricWaterMd = (where, populates, attr) => {
  return ElectricWaterMd.findOne({ where, populates, attr });
};

export const createElectricWaterMd = (attr) => {
  return ElectricWaterMd.create({ attr });
};

export const updateElectricWaterMd = (where, attr) => {
  return ElectricWaterMd.update({ where, attr });
};

export const updateManyElectricWaterMd = (where, attr) => {
  return ElectricWaterMd.update({ where, attr });
};

export const deleteElectricWaterMd = (where) => {
  return ElectricWaterMd.delete({ where });
};
