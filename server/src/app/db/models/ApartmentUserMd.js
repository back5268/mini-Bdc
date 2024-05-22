import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ApartmentUserMd extends ModelBase {
  project;
  user;
  apartment;
  type;
  deletedAt;
}

ApartmentUserMd.init('ApartmentUser', {
  project: { type: String, required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  apartment: { type: ObjectId, ref: 'Apartment', required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
    description: '1: Chủ hộ, 2: Vợ chồng, 3: Con, 4: Bố mẹ, 5: Anh chị em, 6: Khách thuê, 7: Chủ hộ cũ, 8: Khác'
  },
  deletedAt: { type: Date }
});

export const listApartmentUserMd = (where, page, limit, populates, attr, sort) => {
  return ApartmentUserMd.find({ where, page, limit, populates, attr, sort });
};

export const countApartmentUserMd = (where) => {
  return ApartmentUserMd.count({ where });
};

export const detailApartmentUserMd = (where, populates, attr) => {
  return ApartmentUserMd.findOne({ where, populates, attr });
};

export const createApartmentUserMd = (attr) => {
  return ApartmentUserMd.create({ attr });
};

export const updateApartmentUserMd = (where, attr) => {
  return ApartmentUserMd.update({ where, attr });
};

export const updateManyApartmentUserMd = (where, attr) => {
  return ApartmentUserMd.update({ where, attr });
};

export const deleteApartmentUserMd = (where) => {
  return ApartmentUserMd.delete({ where });
};
