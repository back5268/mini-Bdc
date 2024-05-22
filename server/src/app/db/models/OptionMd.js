import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class OptionMd extends ModelBase {
  project;
  apartment;
  by;
  subject;
  content;
  type;
  status;
  files;
  deletedAt;
}

OptionMd.init('Option', {
  project: { type: String, required: true },
  apartment: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: true,
    description:
      '1: Vệ sinh, 2: Bảo vệ, 3: Tiếng ồn, 4: Tiện ích, 5: Dịch vụ khách hàng, 6: Bãi đỗ xe, 7: Thang máy, 8: Hỗ trợ kỹ thuật, 9: Phí và thanh toán, 10: Khác'
  },
  status: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: BQL đã tiếp nhận, 2: BQL đang xử lý, 3: Chờ cư dân phản hồi, 4: Hoàn thành, 5: Hủy'
  },
  files: [{ type: String, required: true }],
  deletedAt: { type: Date }
});

export const listOptionMd = (where, page, limit, populates, attr, sort) => {
  return OptionMd.find({ where, page, limit, populates, attr, sort });
};

export const countOptionMd = (where) => {
  return OptionMd.count({ where });
};

export const detailOptionMd = (where, populates, attr) => {
  return OptionMd.findOne({ where, populates, attr });
};

export const createOptionMd = (attr) => {
  return OptionMd.create({ attr });
};

export const updateOptionMd = (where, attr) => {
  return OptionMd.update({ where, attr });
};

export const updateManyOptionMd = (where, attr) => {
  return OptionMd.update({ where, attr });
};

export const deleteOptionMd = (where) => {
  return OptionMd.delete({ where });
};
