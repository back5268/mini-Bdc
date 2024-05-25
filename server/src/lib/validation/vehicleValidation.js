export const listVehicleValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  apartment: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailVehicleValid = {
  _id: 'string'
};

export const addVehicleValid = {
  name: 'string',
  aprtment: 'string',
  licensePlate: 'string',
  service: 'string',
  type: 'number',
  description: { type: 'string', allowNull: true },
  data: { type: 'json', allowNull: true }
};

export const updateVehicleValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  aprtment: { type: 'string', allowNull: true },
  licensePlate: { type: 'string', allowNull: true },
  service: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true },
  data: { type: 'json', allowNull: true },
  status: { type: 'number', allowNull: true }
};
