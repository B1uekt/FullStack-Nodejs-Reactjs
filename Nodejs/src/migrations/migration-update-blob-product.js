module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Products', 'image', {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        });

        await queryInterface.changeColumn('Products', 'thumbnail_1', {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        });

        await queryInterface.changeColumn('Products', 'thumbnail_2', {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        });

        await queryInterface.changeColumn('Products', 'thumbnail_3', {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        });

        await queryInterface.addColumn('Products', 'quantity', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Products', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.changeColumn('Products', 'thumbnail_1', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.changeColumn('Products', 'thumbnail_2', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.changeColumn('Products', 'thumbnail_3', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.removeColumn('Products', 'quantity');
    }
};
