import { ModelBase } from '@config';

class UserMd extends ModelBase {
  syncId;
  name;
  username;
  code;
  email;
  password;
  avatar;
  gender;
  birthday;
  type;
  bio;
  address;
  notifies;
  lastLogin;
  token;
  typeLogin;
  status;
  deletedAt;
}

UserMd.init('User', {
  syncId: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true },
  code: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  gender: { type: Number, enum: [1, 2], description: '1: Name, 2: Nữ' },
  birthday: { type: Date },
  type: { type: String, default: 'customer' },
  bio: { type: String },
  address: [
    {
      name: { type: String },
      phone: { type: String },
      address: { type: String },
      location: { type: String },
      type: { type: String, enum: ['nha_rieng', 'van_phong'] },
      isDefault: { type: Boolean }
    }
  ],
  notifies: { type: Array, default: [] },
  lastLogin: { type: Date },
  token: { type: String },
  typeLogin: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListUserMd = (where, page, limit, populates, sort, attr) => {
  return UserMd.find({ where, page, limit, sort, attr, populates });
};

export const countListUserMd = (where) => {
  return UserMd.count({ where });
};

export const getDetailUserMd = (where, populates, attr) => {
  return UserMd.findOne({ where, attr, populates });
};

export const addUserMd = (attr) => {
  return UserMd.create({ attr });
};

export const updateUserMd = (where, attr) => {
  return UserMd.update({ where, attr });
};

export const deleteUserMd = (where) => {
  return UserMd.delete({ where });
};
