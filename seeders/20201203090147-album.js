'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'albums',
      [
        {
          name: 'Don Giovanni',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Mozart's Greatest Hits",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ode to Joy',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Classical Greatest Hits',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('albums', null, {});
  }
};
