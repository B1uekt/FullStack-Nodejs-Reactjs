'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    OderDetail.init({
        id: DataTypes.INTEGER,
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: order,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: product,
                key: 'id'
            }
        },
        price: DataTypes.DECIMAL(10, 3),
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'OderDetail',
    });
    return OderDetail;
};