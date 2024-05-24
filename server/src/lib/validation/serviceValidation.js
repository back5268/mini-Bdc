export const listServiceValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailServiceValid = {
  _id: 'string'
};

export const addServiceValid = {
  name: 'string',
  code: 'string',
  price: 'string',
  type: 'number',
  vehicleType: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true },
  apartments: { type: 'json', allowNull: true }
};

export const updateServiceValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  price: { type: 'string', allowNull: true },
  apartments: { type: 'json', allowNull: true },
  type: { type: 'number', allowNull: true },
  vehicleType: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true }
};

export const checkApartmentValid = {
  type: 'number',
  vehicleType: { type: 'number', allowNull: true },
  service: { type: 'string', allowNull: true }
};

export const updateStatusServiceValid = {
  _id: 'string',
  status: { type: 'string', allowNull: true }
};
