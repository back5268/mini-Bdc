import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ApartmentLogMd extends ModelBase {
  by;
  apartment;
  type;
  deletedAt;
}

ApartmentLogMd.init('ApartmentLog', {
  by: { type: ObjectId, ref: 'User', required: true },
  apartment: { type: ObjectId, ref: 'Apartment', required: true },
  type: { type: String, enum: ['in', 'out'] },
  deletedAt: { type: Date }
});

export const listApartmentLogMd = (where, page, limit, populates, attr, sort) => {
  return ApartmentLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countApartmentLogMd = (where) => {
  return ApartmentLogMd.count({ where });
};

export const detailApartmentLogMd = (where, populates, attr) => {
  return ApartmentLogMd.findOne({ where, populates, attr });
};

export const createApartmentLogMd = (attr) => {
  return ApartmentLogMd.create({ attr });
};

export const updateApartmentLogMd = (where, attr) => {
  return ApartmentLogMd.update({ where, attr });
};

export const updateManyApartmentLogMd = (where, attr) => {
  return ApartmentLogMd.update({ where, attr });
};

export const deleteApartmentLogMd = (where) => {
  return ApartmentLogMd.delete({ where });
};
