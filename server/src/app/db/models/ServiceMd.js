import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ServiceMd extends ModelBase {
  project;
  by;
  updateBy;
  name;
  code;
  type;
  vehicleType;
  description;
  status;
  price;
  apartments;
  deletedAt;
}

ServiceMd.init('Service', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Phí dịch vụ, 2: Phí điện, 3: Phí nước, 4: Phí phương tiện, 5: Phí khác'
  },
  vehicleType: {
    type: Number,
    enum: [1, 2, 3, 4],
    description: '1: Ô tô, 2: Xe máy, 3: Xe máy điện, 4: Xe đạp'
  },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  price: { type: ObjectId, ref: 'Price', required: true },
  apartments: [{ type: String, required: true }],
  deletedAt: { type: Date }
});

export const listServiceMd = (where, page, limit, populates, attr, sort) => {
  return ServiceMd.find({ where, page, limit, populates, attr, sort });
};

export const countServiceMd = (where) => {
  return ServiceMd.count({ where });
};

export const detailServiceMd = (where, populates, attr) => {
  return ServiceMd.findOne({ where, populates, attr });
};

export const createServiceMd = (attr) => {
  return ServiceMd.create({ attr });
};

export const updateServiceMd = (where, attr) => {
  return ServiceMd.update({ where, attr });
};

export const updateManyServiceMd = (where, attr) => {
  return ServiceMd.update({ where, attr });
};

export const deleteServiceMd = (where) => {
  return ServiceMd.delete({ where });
};
