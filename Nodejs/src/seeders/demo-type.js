'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Types', [
            {
                name: 'Blind Box',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Limited Figure',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Action Figure',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
