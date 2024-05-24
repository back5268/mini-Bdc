export const listPriceValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  recipe: { type: 'number', allowNull: true },
  serviceType: { type: 'number', allowNull: true }
};

export const detailPriceValid = {
  _id: 'string'
};

export const addPriceValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true },
  prices: { type: 'json', allowNull: true },
  recipe: 'number',
  serviceType: 'number'
};

export const updatePriceValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  prices: { type: 'json', allowNull: true },
  recipe: { type: 'number', allowNull: true },
  serviceType: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};
