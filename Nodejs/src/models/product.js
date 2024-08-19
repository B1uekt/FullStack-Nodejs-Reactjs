'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product.init({
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 3),
        is_discount: BOOLEAN,
        discount_percent: DECIMAL(5, 1),
        image: DataTypes.BLOB,
        thumbnail_1: DataTypes.BLOB,
        thumbnail_2: DataTypes.BLOB,
        thumbnail_3: DataTypes.BLOB,
        description: DataTypes.STRING,
        typeId: {
            type: DataTypes.INTEGER,
            references: {
                model: type,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};