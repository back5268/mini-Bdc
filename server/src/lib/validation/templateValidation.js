export const listTemplateValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailTemplateValid = {
  _id: 'string'
};

export const addTemplateValid = {
  subject: 'string',
  code: 'string',
  content: 'string',
  type: 'number',
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const updateTemplateValid = {
  _id: 'string',
  subject: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true }
};
