import mongoose from 'mongoose';
import { validNumberInt } from '@utils';
const Schema = mongoose.Schema;

class ModelBase {
  constructor() {}

  static init(tableName, attr) {
    this.model = mongoose.model(tableName, new Schema(attr, { timestamps: true, suppressReservedKeysWarning: true }));
  }

  static find({ where = {}, page, limit, populates = [], sort = { createdAt: -1 }, attr }) {
    if (!where.deletedAt) where.deletedAt = null;
    const query = this.model.find(where);
    if (attr) query.select(attr);
    if (sort) query.sort(sort);
    if (validNumberInt(limit) && validNumberInt(page)) {
      const skip = Number(limit) * (Number(page) - 1);
      query.skip(skip).limit(limit);
    }
    if (populates && populates.length > 0) {
      populates.forEach((p) => query.populate(p));
    }
    return query.exec();
  }

  static count({ where = {} }) {
    if (!where.deletedAt) where.deletedAt = null;
    return this.model.countDocuments(where);
  }

  static findOne({ where = {}, populates = [], attr }) {
    if (!where.deletedAt) where.deletedAt = null;
    const query = this.model.findOne(where);
    if (attr) query.select(attr);
    if (populates && populates.length > 0) {
      populates.forEach((p) => query.populate(p));
    }
    return query.exec();
  }

  static create({ attr = {} }) {
    if (!attr.createdAt) attr.createdAt = new Date();
    if (!attr.updatedAt) attr.updatedAt = new Date();
    return this.model.create(attr);
  }

  static update({ where = {}, attr = {} }) {
    if (Object.keys(where).length === 0) return;
    if (!attr.updatedAt) attr.updatedAt = new Date();
    return this.model.findOneAndUpdate(where, attr, { new: true });
  }

  static updateMany({ where = {}, attr = {} }) {
    if (Object.keys(where).length === 0) return;
    if (!attr.updatedAt) attr.updatedAt = new Date();
    return this.model.updateMany(where, attr);
  }

  static delete({ where = {} }) {
    if (Object.keys(where).length === 0) return;
    return this.model.findOneAndUpdate(where, { updatedAt: new Date(), deletedAt: new Date() }, { new: true });
  }

  static deleteMany({ where = {} }) {
    if (Object.keys(where).length === 0) return;
    return this.model.updateMany(where, { updatedAt: new Date(), deletedAt: new Date() });
  }
}

export { ModelBase };
