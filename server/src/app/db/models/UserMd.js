import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class UserMd extends ModelBase {
  fullName;
  username;
  email;
  phone;
  password;
  gender;
  type;
  birthday;
  address;
  bio;
  lastLogin;
  token;
  avatar;
  images;
  status;
  otp;
  timeSendOtp;
  code;
  department;
  deletedAt;
}

UserMd.init('User', {
  fullName: { type: String, required: true },
  username: { type: String },
  email: { type: String },
  phone: { type: String },
  password: { type: String },
  gender: { type: Number, enum: [1, 2, 3], description: '1: Name, 2: Nữ, 3; Khác' },
  type: { type: String, enum: ['admin', 'user', 'resident'], default: 'user' },
  birthday: { type: Date },
  address: { type: String },
  bio: { type: String },
  lastLogin: { type: Date },
  token: { type: String },
  avatar: { type: String },
  images: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  otp: { type: String },
  timeSendOtp: { type: Date },
  code: { type: String },
  department: { type: ObjectId, ref: 'Department' },
  deletedAt: { type: Date }
});

export const listUserMd = (where, page, limit, populates, attr, sort) => {
  return UserMd.find({ where, page, limit, populates, attr, sort });
};

export const countUserMd = (where) => {
  return UserMd.count({ where });
};

export const detailUserMd = (where, populates, attr) => {
  return UserMd.findOne({ where, populates, attr });
};

export const createUserMd = (attr) => {
  return UserMd.create({ attr });
};

export const updateUserMd = (where, attr) => {
  return UserMd.update({ where, attr });
};

export const updateManyUserMd = (where, attr) => {
  return UserMd.update({ where, attr });
};

export const deleteUserMd = (where) => {
  return UserMd.delete({ where });
};
