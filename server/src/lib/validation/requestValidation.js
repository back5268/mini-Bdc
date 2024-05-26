export const listRequestValid = {
    page: 'number',
    limit: 'number',
    keySearch: { type: 'string', allowNull: true },
    status: { type: 'number', allowNull: true },
    type: { type: 'number', allowNull: true },
  };
  
  export const detailRequestValid = {
    _id: 'string',
  };
  
  export const addRequestValid = {
    project: 'string',
    apartment: 'string',
    by: 'string',
    subject: 'string',
    data: 'object',
    type: { type: 'number', enum: [1, 2, 3, 4, 5, 6, 7, 8], required: true },
    status: { type: 'number', enum: [1, 2, 3, 4, 5], required: true },
    files: { type: 'json', required: true },
  };
  
  export const updateRequestValid = {
    _id: 'string',
    project: { type: 'string', allowNull: true },
    apartment: { type: 'string', allowNull: true },
    subject: { type: 'string', allowNull: true },
    data: { type: 'object', allowNull: true },
    type: { type: 'number', enum: [1, 2, 3, 4, 5, 6, 7, 8], allowNull: true },
    status: { type: 'number', enum: [1, 2, 3, 4, 5], allowNull: true },
    files: { type: 'json', allowNull: true },
  };
  