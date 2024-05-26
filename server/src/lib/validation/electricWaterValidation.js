export const listElectricWaterValid = {
  page: 'number',
  limit: 'number',
  apartment: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  month: { type: 'number', allowNull: true },
};
