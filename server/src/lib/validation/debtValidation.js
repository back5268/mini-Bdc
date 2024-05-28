export const listDebtLogValid = {
  page: 'number',
  limit: 'number',
  status: { type: 'number', allowNull: true },
  month: { type: 'number', allowNull: true },
  from: { type: 'date', allowNull: true },
  to: { type: 'date', allowNull: true }
};
