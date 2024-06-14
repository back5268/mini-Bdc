export const listNewsValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailNewsValid = {
  _id: 'string'
};

export const addNewsValid = {
  subject: 'string',
  content: 'string',
  time: 'number',
  hashtag: { type: 'json', allowNull: true }
};

export const updateNewsValid = {
  _id: 'string',
  subject: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  time: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true },
  hashtag: { type: 'json', allowNull: true }
};
