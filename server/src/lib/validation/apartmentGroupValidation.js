export const listApartmentGroupValid = {
    page: 'number',
    limit: 'number',
    keySearch: { type: 'string', allowNull: true },
    project: { type: 'string', allowNull: true },
    status: { type: 'number', allowNull: true }
};
export const detailApartmentGroupValid = {
    _id: 'string'
};
export const updateApartmentGroupValid = {
    _id: 'string',
    name: { type: 'string', allowNull: true },
    description: { type: 'string', allowNull: true },
    apartments: { type: 'json', allowNull: true }
};
export const updateStatusApartmentGroupValid = {
    _id: 'string',
    status: { type: 'string', allowNull: true }
};
export const addApartmentGroupValid = {
    name: 'string',
    description: { type: 'string', allowNull: true },
    status: { type: 'string', allowNull: true },
    apartments: { type: 'json', allowNull: true }
};