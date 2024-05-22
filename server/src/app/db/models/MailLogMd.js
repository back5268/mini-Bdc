import { ModelBase } from '@config';

class MailLogMd extends ModelBase {
  to;
  subject;
  content;
  type;
  status;
  mess;
  deletedAt;
}

MailLogMd.init('MailLog', {
  to: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    required: true,
    description: '1: Quên mật khẩu, 2: Thêm mới người dùng, 3: Thông báo, 4: Bảng kê, 5: Phiếu thu, 6: Phiếu chi'
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    description: '0: Đang gửi, 1: Đã gửi, 2: Có lỗi'
  },
  mess: { type: String },
  deletedAt: { type: Date }
});

export const listMailLogMd = (where, page, limit, populates, attr, sort) => {
  return MailLogMd.find({ where, page, limit, populates, attr, sort });
};

export const countMailLogMd = (where) => {
  return MailLogMd.count({ where });
};

export const detailMailLogMd = (where, populates, attr) => {
  return MailLogMd.findOne({ where, populates, attr });
};

export const createMailLogMd = (attr) => {
  return MailLogMd.create({ attr });
};

export const updateMailLogMd = (where, attr) => {
  return MailLogMd.update({ where, attr });
};

export const updateManyMailLogMd = (where, attr) => {
  return MailLogMd.update({ where, attr });
};

export const deleteMailLogMd = (where) => {
  return MailLogMd.delete({ where });
};
