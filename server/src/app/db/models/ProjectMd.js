import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ProjectMd extends ModelBase {
  by;
  updateBy;
  name;
  code;
  address;
  email;
  phone;
  roomNumber;
  description;
  avatar;
  images;
  managements;
  boards;
  status;
  deletedAt;
}

ProjectMd.init('Project', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  code: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  description: { type: String },
  avatar: { type: String },
  images: [{ type: String }],
  managements: [{ type: String, ref: 'User' }],
  boards: [{ type: String, ref: 'User' }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const listProjectMd = (where, page, limit, populates, attr, sort) => {
  return ProjectMd.find({ where, page, limit, populates, attr, sort });
};

export const countProjectMd = (where) => {
  return ProjectMd.count({ where });
};

export const detailProjectMd = (where, populates, attr) => {
  return ProjectMd.findOne({ where, populates, attr });
};

export const createProjectMd = (attr) => {
  return ProjectMd.create({ attr });
};

export const updateProjectMd = (where, attr) => {
  return ProjectMd.update({ where, attr });
};

export const updateManyProjectMd = (where, attr) => {
  return ProjectMd.update({ where, attr });
};

export const deleteProjectMd = (where) => {
  return ProjectMd.delete({ where });
};
