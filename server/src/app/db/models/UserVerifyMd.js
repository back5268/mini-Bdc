import { ModelBase } from '@config';

class UserVerifyMd extends ModelBase {
  otp;
  username;
  email;
  type;
  expiredAt;
  deletedAt;
}

UserVerifyMd.init('UserVerify', {
  otp: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: Number, required: true, description: '1: Xác thực đăng ký, 2: Xác thực quên mật khẩu' },
  expiredAt: { type: Date, required: true },
  deletedAt: { type: Date }
});

export const getListUserVerifyMd = (where, page, limit, populates, sort, attr) => {
  return UserVerifyMd.find({ where, page, limit, sort, attr, populates });
};

export const countListUserVerifyMd = (where) => {
  return UserVerifyMd.count({ where });
};

export const getDetailUserVerifyMd = (where, populates, attr) => {
  return UserVerifyMd.findOne({ where, attr, populates });
};

export const addUserVerifyMd = (attr) => {
  return UserVerifyMd.create({ attr });
};

export const updateUserVerifyMd = (where, attr) => {
  return UserVerifyMd.update({ where, attr });
};

export const deleteUserVerifyMd = (where) => {
  return UserVerifyMd.delete({ where });
};

export const deleteManyUserVerifyMd = (where) => {
  return UserVerifyMd.deleteMany({ where });
};
