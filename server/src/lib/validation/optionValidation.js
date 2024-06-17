export const listOptionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  apartment: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailOptionValid = {
  _id: 'string'
};

export const addOptionValid = {
  apartment: 'string',
  subject: 'string',
  content: 'string',
  type: 'number'
};

export const updateOptionValid = {
  _id: 'string',
  subject: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  files: { type: 'json', allowNull: true }
};
