export const listBillValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  apartment: { type: 'string', allowNull: true },
  status: { type: 'json', allowNull: true },
  month: { type: 'number', allowNull: true },
  from: { type: 'date', allowNull: true },
  to: { type: 'date', allowNull: true }
};

export const detailBillValid = {
  _id: 'string'
};
