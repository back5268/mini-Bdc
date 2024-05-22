import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ApartmentGroupMd extends ModelBase {
  by;
  updateBy;
  name;
  description;
  project;
  apartments;
  status;
  deletedAt;
}

ApartmentGroupMd.init('ApartmentGroup', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  project: { type: String, required: true },
  apartments: [{ type: String, required: true }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const listApartmentGroupMd = (where, page, limit, populates, attr, sort) => {
  return ApartmentGroupMd.find({ where, page, limit, populates, attr, sort });
};

export const countApartmentGroupMd = (where) => {
  return ApartmentGroupMd.count({ where });
};

export const detailApartmentGroupMd = (where, populates, attr) => {
  return ApartmentGroupMd.findOne({ where, populates, attr });
};

export const createApartmentGroupMd = (attr) => {
  return ApartmentGroupMd.create({ attr });
};

export const updateApartmentGroupMd = (where, attr) => {
  return ApartmentGroupMd.update({ where, attr });
};

export const updateManyApartmentGroupMd = (where, attr) => {
  return ApartmentGroupMd.update({ where, attr });
};

export const deleteApartmentGroupMd = (where) => {
  return ApartmentGroupMd.delete({ where });
};
