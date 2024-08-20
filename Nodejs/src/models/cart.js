'use strict';
const { Model, DataTypes } = require('sequelize');
const User = require('./user');
const Product = require('./product');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Cart.init({
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
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

    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};