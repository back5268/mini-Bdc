export const listApartmentValid = {
  page: 'number',
  limit: 'number',
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
  images: { type: 'json', allowNull: true }
};

export const addApartmentValid = {
  name: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  area: { type: 'number', allowNull: true },
  floor: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};
