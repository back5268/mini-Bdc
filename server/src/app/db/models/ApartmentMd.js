import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ApartmentMd extends ModelBase {
  by;
  updateBy;
  project;
  name;
  code;
  area;
  floor;
  description;
  status;
  owner;
  deletedAt;
}

ApartmentMd.init('Apartment', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  project: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  area: { type: Number, required: true },
  floor: { type: Number, required: true },
  description: { type: String },
  status: { type: Number, enum: [1, 2, 3], required: true, description: '1: Trống, 2: Đang cho thuê, 3: Đang cải tạo' },
  owner: { type: ObjectId, ref: 'User' },
  deletedAt: { type: Date }
});

export const listApartmentMd = (where, page, limit, populates, attr, sort) => {
  return ApartmentMd.find({ where, page, limit, populates, attr, sort });
};

export const countApartmentMd = (where) => {
  return ApartmentMd.count({ where });
};

export const detailApartmentMd = (where, populates, attr) => {
  return ApartmentMd.findOne({ where, populates, attr });
};

export const createApartmentMd = (attr) => {
  return ApartmentMd.create({ attr });
};

export const updateApartmentMd = (where, attr) => {
  return ApartmentMd.update({ where, attr });
};

export const updateManyApartmentMd = (where, attr) => {
  return ApartmentMd.update({ where, attr });
};

export const deleteApartmentMd = (where) => {
  return ApartmentMd.delete({ where });
};
