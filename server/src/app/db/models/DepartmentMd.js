import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class DepartmentMd extends ModelBase {
  by;
  updateBy;
  name;
  description;
  status;
  users;
  tools;
  deletedAt;
}

DepartmentMd.init('Department', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  projects: [{ type: String, required: true }],
  deletedAt: { type: Date }
});

export const listDepartmentMd = (where, page, limit, populates, attr, sort) => {
  return DepartmentMd.find({ where, page, limit, populates, attr, sort });
};

export const countDepartmentMd = (where) => {
  return DepartmentMd.count({ where });
};

export const detailDepartmentMd = (where, populates, attr) => {
  return DepartmentMd.findOne({ where, populates, attr });
};

export const createDepartmentMd = (attr) => {
  return DepartmentMd.create({ attr });
};

export const updateDepartmentMd = (where, attr) => {
  return DepartmentMd.update({ where, attr });
};

export const updateManyDepartmentMd = (where, attr) => {
  return DepartmentMd.update({ where, attr });
};

export const deleteDepartmentMd = (where) => {
  return DepartmentMd.delete({ where });
};
