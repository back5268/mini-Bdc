import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class NewMd extends ModelBase {
  project;
  by;
  updateBy;
  subject;
  content;
  hashtag;
  status;
  files;
  deletedAt;
}

NewMd.init('New', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  hashtag: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1 },
  files: [{ type: String }],
  deletedAt: { type: Date }
});

export const listNewMd = (where, page, limit, populates, attr, sort) => {
  return NewMd.find({ where, page, limit, populates, attr, sort });
};

export const countNewMd = (where) => {
  return NewMd.count({ where });
};

export const detailNewMd = (where, populates, attr) => {
  return NewMd.findOne({ where, populates, attr });
};

export const createNewMd = (attr) => {
  return NewMd.create({ attr });
};

export const updateNewMd = (where, attr) => {
  return NewMd.update({ where, attr });
};

export const updateManyNewMd = (where, attr) => {
  return NewMd.update({ where, attr });
};

export const deleteNewMd = (where) => {
  return NewMd.delete({ where });
};
