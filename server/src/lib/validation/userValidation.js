import { REGEX } from '@constant';

export const listUserValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  type: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailUserValid = {
  _id: 'string'
};

export const addUserValid = {
  name: 'string',
  username: 'string',
  code: 'string',
  email: 'email',
  bio: { type: 'string', allowNull: true },
  avatar: { type: 'string', allowNull: true },
  gender: { type: 'number', allowNull: true },
  birthday: { type: 'string', allowNull: true }
};

export const updateUserValid = {
  _id: 'string',
  username: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  name: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  password: { type: 'string', allowNull: true },
  bio: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  avatar: { type: 'string', allowNull: true },
  gender: { type: 'number', allowNull: true },
  birthday: { type: 'string', allowNull: true }
};

export const updateUserInfoValid = {
  username: { type: 'string', allowNull: true },
  name: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  bio: { type: 'string', allowNull: true },
  address: { type: 'string', allowNull: true },
  avatar: { type: 'string', allowNull: true }
};

export const changePasswordValid = {
  password: { type: 'string', pattern: REGEX.PASSWORD },
  newPassword: { type: 'string', pattern: REGEX.PASSWORD }
};

export const resetPasswordValid = {
  _id: 'string'
};
