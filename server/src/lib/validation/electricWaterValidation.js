export const listElectricWaterValid = {
  page: 'number',
  limit: 'number',
  apartment: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  month: { type: 'number', allowNull: true }
};

export const detailElectricWaterValid = {
  _id: 'string',
};

export const addElectricWaterValid = {
  apartment: 'string',
  type: 'number',
  month: 'number',
  beforeNumber: 'number',
  afterNumber: 'number',
  dateUpdate: 'date',
};
