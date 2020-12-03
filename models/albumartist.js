'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albumArtist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      albumArtist.belongsTo(models.artist)
      albumArtist.belongsTo(models.album)
    }
  };
  albumArtist.init({
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'albumArtist',
  });
  return albumArtist;
};