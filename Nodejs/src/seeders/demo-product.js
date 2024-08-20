'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', [{
            name: 'SKULLPANDA Ancient Castle Series Pop Mart',
            price: '240000',
            is_discount: false,
            discount_percent: 0,
            image: null,
            thumbnail_1: null,
            thumbnail_2: null,
            thumbnail_3: null,
            description: 'Kích Thước: 7~9cm. Chất Liệu: Vinyl/Plush. Độ Tuổi: 15+',
            typeId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
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
