import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class PermissionMd extends ModelBase {
  by;
  updateBy;
  name;
  description;
  status;
  users;
  tools;
  deletedAt;
}

PermissionMd.init('Permission', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  users: [{ type: String, required: true }],
  tools: [{ route: { type: String, required: true }, actions: { type: Array, required: true } }],
  deletedAt: { type: Date }
});

export const listPermissionMd = (where, page, limit, populates, attr, sort) => {
  return PermissionMd.find({ where, page, limit, populates, attr, sort });
};

export const countPermissionMd = (where) => {
  return PermissionMd.count({ where });
};

export const detailPermissionMd = (where, populates, attr) => {
  return PermissionMd.findOne({ where, populates, attr });
};

export const createPermissionMd = (attr) => {
  return PermissionMd.create({ attr });
};

export const updatePermissionMd = (where, attr) => {
  return PermissionMd.update({ where, attr });
};

export const updateManyPermissionMd = (where, attr) => {
  return PermissionMd.update({ where, attr });
};

export const deletePermissionMd = (where) => {
  return PermissionMd.delete({ where });
};
