'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'khanhthi0211@gmail.com',
      password: '123456',
      firstName: 'Zeust',
      lastName: 'Nguyen',
      phone: '0123456789',
      address: 'TPHCM',
      gender: true,
      role: 'ADMIN',
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
