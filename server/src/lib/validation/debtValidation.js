export const listDebtLogValid = {
  page: 'number',
  limit: 'number',
  status: { type: 'number', allowNull: true },
  month: { type: 'number', allowNull: true },
  from: { type: 'date', allowNull: true },
  to: { type: 'date', allowNull: true }
};

export const calculatorDebtValid = {
  month: 'number',
  deadline: 'date',
  services: 'json',
  apartments: 'json'
};

export const listDebitValid = {
  page: 'number',
  limit: 'number',
  apartment: { type: 'string', allowNull: true },
  serviceType: { type: 'number', allowNull: true },
  month: { type: 'number', allowNull: true },
  from: { type: 'date', allowNull: true },
  to: { type: 'date', allowNull: true }
};

export const listDebtValid = {
  apartment: { type: 'string', allowNull: true }
};

export const debtRemindValid = {
  _ids: 'json'
};
