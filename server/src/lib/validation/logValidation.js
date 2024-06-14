export const listLogValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  to: { type: 'string', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  toDate: { type: 'date', allowNull: true },
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};
