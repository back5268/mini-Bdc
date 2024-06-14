export const listResidentValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  apartment: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailResidentValid = {
  _id: 'string'
};

export const addResidentValid = {
  fullName: 'string',
  email: 'email',
  phone: 'string',
  bio: { type: 'string', allowNull: true },
  gender: { type: 'number', allowNull: true },
  birthday: { type: 'date', allowNull: true },
  apartment: 'json'
};

export const updateResidentValid = {
  _id: 'string',
  fullName: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  phone: { type: 'string', allowNull: true },
  bio: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  gender: { type: 'number', allowNull: true },
  birthday: { type: 'date', allowNull: true },
  apartment: { type: 'json', allowNull: true }
};
