export const listPermissionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  user: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailPermissionValid = {
  _id: 'string'
};

export const addPermissionValid = {
  name: 'string',
  users: { type: 'json', allowNull: true },
  tools: { type: 'json', allowNull: true },
  description: { type: 'string', allowNull: true }
};

export const updatePermissionValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  users: { type: 'json', allowNull: true },
  tools: { type: 'json', allowNull: true }
};
