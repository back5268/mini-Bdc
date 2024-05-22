import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class RequestMd extends ModelBase {
  project;
  apartment;
  by;
  subject;
  data;
  type;
  status;
  files;
  deletedAt;
}

RequestMd.init('Request', {
  project: { type: String, required: true },
  apartment: { type: String, required: true },
  by: { type: ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  data: { type: Object, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
    description:
      '1: Thêm phương tiện, 2: Hủy phương tiện, 3: Cấp lại thẻ, 4: Chuyển đồ, 5: Sửa chữa, 6: Thêm nhân khẩu, 7: Thay đổi thông tin cá nhân, 8: Khác'
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

export const listRequestMd = (where, page, limit, populates, attr, sort) => {
  return RequestMd.find({ where, page, limit, populates, attr, sort });
};

export const countRequestMd = (where) => {
  return RequestMd.count({ where });
};

export const detailRequestMd = (where, populates, attr) => {
  return RequestMd.findOne({ where, populates, attr });
};

export const createRequestMd = (attr) => {
  return RequestMd.create({ attr });
};

export const updateRequestMd = (where, attr) => {
  return RequestMd.update({ where, attr });
};

export const updateManyRequestMd = (where, attr) => {
  return RequestMd.update({ where, attr });
};

export const deleteRequestMd = (where) => {
  return RequestMd.delete({ where });
};
