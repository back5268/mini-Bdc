import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CoinMd extends ModelBase {
  project;
  apartment;
  type;
  amount;
  coinBefore;
  coinAfter;
  deletedAt;
}

CoinMd.init('Coin', {
  project: { type: String, required: true },
  apartment: { type: String, required: true },
  type: { type: Number, enum: [1, 2], description: '1: Trừ tiền, 2: Tăng tiền', required: true },
  amount: { type: Number, required: true },
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
