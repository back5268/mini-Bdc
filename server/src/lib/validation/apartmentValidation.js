export const listApartmentValid = {
  page: { type: 'number', allowNull: true },
  limit: { type: 'number', allowNull: true },
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailApartmentValid = {
  _id: 'string'
};

export const updateApartmentValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  area: { type: 'number', allowNull: true },
  floor: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true },
  owner: { type: 'string', allowNull: true }
};

export const addApartmentValid = {
  name: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  area: { type: 'number', allowNull: true },
  floor: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true },
  owner: { type: 'string', allowNull: true }
};
