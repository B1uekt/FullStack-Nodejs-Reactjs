'use strict';
const {
    Model
} = require('sequelize');
const Type = require('./type.js');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.Type, { foreignKey: 'typeId' });
        }
    };
    Product.init({
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 3),
        is_discount: DataTypes.BOOLEAN,
        discount_percent: DataTypes.DECIMAL(5, 1),
        image: DataTypes.BLOB,
        thumbnail_1: DataTypes.BLOB,
        thumbnail_2: DataTypes.BLOB,
        thumbnail_3: DataTypes.BLOB,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        typeId: {
            type: DataTypes.INTEGER,
            references: {
                model: Type,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Product',
        paranoid: true,
        timestamps: true
    });
    return Product;
};