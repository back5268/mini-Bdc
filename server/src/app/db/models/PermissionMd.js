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
  tools: [{ type: Object, required: true, description: '{ route, actions }' }],
  deletedAt: { type: Date }
});

export const getListPermissionMd = (where, page, limit, populates, sort, attr) => {
  return PermissionMd.find({ where, page, limit, sort, attr, populates });
};

export const countListPermissionMd = (where) => {
  return PermissionMd.count({ where });
};

export const getDetailPermissionMd = (where, populates, attr) => {
  return PermissionMd.findOne({ where, attr, populates });
};

export const addPermissionMd = (attr) => {
  return PermissionMd.create({ attr });
};

export const updatePermissionMd = (where, attr) => {
  return PermissionMd.update({ where, attr });
};

export const deletePermissionMd = (where) => {
  return PermissionMd.delete({ where });
};
