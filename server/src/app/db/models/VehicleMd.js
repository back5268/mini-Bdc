import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class VehicleMd extends ModelBase {
  project;
  by;
  updateBy;
  aprtment;
  name;
  licensePlate;
  type;
  service;
  data;
  description;
  files;
  status;
  deletedAt;
}

VehicleMd.init('Vehicle', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  aprtment: { type: String, required: true },
  name: { type: String, required: true },
  licensePlate: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4],
    description: '1: Ô tô, 2: Xe máy, 3: Xe máy điện, 4: Xe đạp'
  },
  service: { type: ObjectId, ref: 'Service', required: true },
  data: { type: Object },
  description: { type: String },
  files: [{ type: String, required: true }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const listVehicleMd = (where, page, limit, populates, attr, sort) => {
  return VehicleMd.find({ where, page, limit, populates, attr, sort });
};

export const countVehicleMd = (where) => {
  return VehicleMd.count({ where });
};

export const detailVehicleMd = (where, populates, attr) => {
  return VehicleMd.findOne({ where, populates, attr });
};

export const createVehicleMd = (attr) => {
  return VehicleMd.create({ attr });
};

export const updateVehicleMd = (where, attr) => {
  return VehicleMd.update({ where, attr });
};

export const updateManyVehicleMd = (where, attr) => {
  return VehicleMd.update({ where, attr });
};

export const deleteVehicleMd = (where) => {
  return VehicleMd.delete({ where });
};
