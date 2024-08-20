'use strict';
const { Model, DataTypes } = require('sequelize');
const Order = require('./order');
const Product = require('./product');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    OrderDetail.init({
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 3),

    }, {
        sequelize,
        modelName: 'OrderDetail',
    });
    return OrderDetail;
};