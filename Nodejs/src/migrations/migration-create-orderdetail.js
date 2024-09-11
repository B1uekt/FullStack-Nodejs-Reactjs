'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('OrderDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            OrderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Orders', // tên bảng là 'types'
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Products', // tên bảng là 'types'
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            quantity: {
                type: DataTypes.INTEGER
            },
            price: {
                type: DataTypes.DECIMAL(10, 3)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('OrderDetails');
    }
};