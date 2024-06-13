export const listProjectValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailProjectValid = {
  _id: 'string'
};

export const addProjectValid = {
  name: 'string',
  code: 'string',
  email: 'string',
  phone: 'string',
  address: 'string',
  description: { type: 'string', allowNull: true },
  department: 'string'
};

export const updateProjectValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  phone: { type: 'string', allowNull: true },
  address: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  avatar: { type: 'string', allowNull: true },
  images: { type: 'json', allowNull: true },
  department: { type: 'string', allowNull: true }
};
