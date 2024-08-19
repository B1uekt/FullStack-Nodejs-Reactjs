'use strict';
const {
    Model
} = require('sequelize');
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
        id: DataTypes.INTEGER,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: user,
                key: 'id'
            }
        },
        order_date: DataTypes.DATE,
        total_amount: DataTypes.DECIMAL(10, 3),
        total_quantity: DataTypes.INTEGER,
        status: DataTypes.STRING,
        delivery_date: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};