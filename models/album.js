'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      album.belongsToMany(models.artist, {
        through: "albumArtists",
        foreignKey: "albumId",
      })
    }
  };
  album.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'album',
  });
  return album;
};