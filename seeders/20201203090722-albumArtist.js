'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'albumArtists',
      [
        {
          albumId: 1,
          artistId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          albumId: 2,
          artistId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          albumId: 3,
          artistId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          albumId: 4,
          artistId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          albumId: 4,
          artistId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
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
