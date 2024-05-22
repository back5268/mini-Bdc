import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CommentMd extends ModelBase {
  by;
  content;
  file;
  type;
  parentId;
  objectId;
  deletedAt;
}

CommentMd.init('Comment', {
  by: { type: ObjectId, ref: 'User', required: true },
  content: { type: String },
  file: { type: String },
  type: {
    type: Number,
    enum: [1, 2],
    required: true,
    description: '1: Bình luận ý kiến cư dân, 2: Bình luận yêu cầu dịch vụ'
  },
  parentId: { type: String },
  objectId: { type: String },
  deletedAt: { type: Date }
});

export const listCommentMd = (where, page, limit, populates, attr, sort) => {
  return CommentMd.find({ where, page, limit, populates, attr, sort });
};

export const countCommentMd = (where) => {
  return CommentMd.count({ where });
};

export const detailCommentMd = (where, populates, attr) => {
  return CommentMd.findOne({ where, populates, attr });
};

export const createCommentMd = (attr) => {
  return CommentMd.create({ attr });
};

export const updateCommentMd = (where, attr) => {
  return CommentMd.update({ where, attr });
};

export const updateManyCommentMd = (where, attr) => {
  return CommentMd.update({ where, attr });
};

export const deleteCommentMd = (where) => {
  return CommentMd.delete({ where });
};
