module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('albumArtists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artistId: {
        type: Sequelize.INTEGER,
        references: {
          model: "artists",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: "albums",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('albumArtists')
  }
}