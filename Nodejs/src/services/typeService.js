const db = require('../models/index');

const getTypeService = async () => {
    try {
        let result = await db.Type.findAll({
            attributes: ['name'],
        })
        return {
            result,
            EC: 0,
            EM: 'Success',
        }
    } catch (error) {
        console.error('Error fetching products:', error);


        return {
            EC: 1,
            EM: 'Failed to fetch type',
            error: error.message,
        };
    }
}

module.exports = { getTypeService };