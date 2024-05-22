import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CardMd extends ModelBase {
  project;
  by;
  updateBy;
  code;
  number;
  type;
  status;
  start;
  end;
  apartment;
  owner;
  deletedAt;
}

CardMd.init('Card', {
  project: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  code: { type: String, required: true },
  number: { type: String, required: true, description: 'Mã thẻ từ' },
  type: { type: String, enum: ['vehicle', 'resident'], required: true },
  status: { type: Number, enum: [0, 1], default: 1 },
  start: { type: Date, description: 'Ngày bắt đầu sử dụng' },
  end: { type: Date, description: 'Ngày kết thúc' },
  apartment: { type: String, required: true },
  owner: { type: ObjectId, ref: 'User', required: true },
  deletedAt: { type: Date }
});

export const listCardMd = (where, page, limit, populates, attr, sort) => {
  return CardMd.find({ where, page, limit, populates, attr, sort });
};

export const countCardMd = (where) => {
  return CardMd.count({ where });
};

export const detailCardMd = (where, populates, attr) => {
  return CardMd.findOne({ where, populates, attr });
};

export const createCardMd = (attr) => {
  return CardMd.create({ attr });
};

export const updateCardMd = (where, attr) => {
  return CardMd.update({ where, attr });
};

export const updateManyCardMd = (where, attr) => {
  return CardMd.update({ where, attr });
};

export const deleteCardMd = (where) => {
  return CardMd.delete({ where });
};
