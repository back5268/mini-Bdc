import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CoinMd extends ModelBase {
  project;
  apartment;
  type;
  fromBy;
  amount;
  receipt;
  bill;
  note;
  coinBefore;
  coinAfter;
  deletedAt;
}

CoinMd.init('Coin', {
  project: { type: String, required: true },
  apartment: { type: String, required: true },
  type: { type: Number, enum: [1, 2], description: '1: Trừ tiền, 2: Tăng tiền', required: true },
  fromBy: { type: Number, enum: [1, 2, 3], description: '1: Phiếu thu, 2: Phiếu hoàn tiền, 3: Bảng kê', required: true },
  amount: { type: Number, required: true },
  receipt: { type: ObjectId, ref: 'Receipt', required: true },
  bill: { type: ObjectId, ref: 'Bill', required: true },
  note: { type: String },
  coinBefore: { type: Number, required: true },
  coinAfter: { type: Number, required: true },
  deletedAt: { type: Date }
});

export const listCoinMd = (where, page, limit, populates, attr, sort) => {
  return CoinMd.find({ where, page, limit, populates, attr, sort });
};

export const countCoinMd = (where) => {
  return CoinMd.count({ where });
};

export const detailCoinMd = (where, populates, attr) => {
  return CoinMd.findOne({ where, populates, attr });
};

export const createCoinMd = (attr) => {
  return CoinMd.create({ attr });
};

export const updateCoinMd = (where, attr) => {
  return CoinMd.update({ where, attr });
};

export const updateManyCoinMd = (where, attr) => {
  return CoinMd.update({ where, attr });
};

export const deleteCoinMd = (where) => {
  return CoinMd.delete({ where });
};