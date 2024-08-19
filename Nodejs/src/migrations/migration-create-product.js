'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            price: {
                type: DataTypes.DECIMAL(10, 3)
            },
            is_discount: {
                type: Sequelize.BOOLEAN
            },
            discount_percent: {
                type: Sequelize.DECIMAL(5, 1)
            },
            image: {
                type: DataTypes.BLOB
            },
            thumbnail_1: {
                type: DataTypes.BLOB
            },
            thumbnail_2: {
                type: DataTypes.BLOB
            },
            thumbnail_3: {
                type: DataTypes.BLOB
            },
            description: {
                type: Sequelize.STRING
            },
            typeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Types', // tên bảng là 'types'
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};