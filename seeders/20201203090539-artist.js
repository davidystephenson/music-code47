'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'artists',
      [
        {
          name: 'Mozart',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Beethoven',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('artists', null, {});
  }
};
