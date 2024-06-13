export const addResidentValid = {
    fullName: 'string',
    username: 'string',
    code: 'string',
    email: 'email',
    phone: 'string',
    type: 'string',
    bio: { type: 'string', allowNull: true },
    gender: { type: 'number', allowNull: true },
    birthday: { type: 'string', allowNull: true },
    address: { type: 'string', allowNull: true }
};
export const updateResidentValid = {
    _id: 'string',
    username: { type: 'string', allowNull: true },
    code: { type: 'string', allowNull: true },
    fullName: { type: 'string', allowNull: true },
    email: { type: 'string', allowNull: true },
    bio: { type: 'string', allowNull: true },
    status: { type: 'number', allowNull: true },
    avatar: { type: 'string', allowNull: true },
    gender: { type: 'number', allowNull: true },
    birthday: { type: 'string', allowNull: true },
    address: { type: 'string', allowNull: true },
};
export const listResidentValid = {
    page: 'number',
    limit: 'number',
    keySearch: { type: 'string', allowNull: true },
    status: { type: 'number', allowNull: true }
};

export const detailResidentValid = {
    _id: 'string'
};