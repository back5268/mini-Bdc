export const listDepartmentValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
};

export const detailDepartmentValid = {
  _id: 'string'
};

export const addDepartmentValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true },
  projects: { type: 'json', allowNull: true }
};

export const updateDepartmentValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  projects: { type: 'json', allowNull: true }
};
