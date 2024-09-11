'use strict';
const {
    Model
} = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Order.init({
        userId: DataTypes.INTEGER,
        order_date: DataTypes.DATE,
        total_amount: DataTypes.DECIMAL(10, 3),
        total_quantity: DataTypes.INTEGER,
        status: DataTypes.STRING,
        delivery_date: DataTypes.DATE,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Order',
        paranoid: true,
        timestamps: true
    });
    return Order;
};