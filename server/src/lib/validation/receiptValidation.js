export const listReceiptValid = {
  page: 'number',
  limit: 'number',
  by: { type: 'string', allowNull: true },
  payer: { type: 'string', allowNull: true },
  apartment: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  paymentType: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailReceiptValid = {
  _id: 'string'
};

export const addReceiptValid = {
  apartment: 'string',
  payer: 'string',
  bill: { type: 'string', allowNull: true },
  type: 'number',
  paymentType: 'number',
  amount: 'number',
  note: { type: 'string', allowNull: true }
};
