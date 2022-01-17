'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Storage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Watch}) {
      this.hasMany(Watch,{foreignKey:'storageID',as:'watches'})
    }
  };
  Storage.init({
    capacity:{
      type: DataTypes.INTEGER,
      allowNull: false

    }
  }, {
    sequelize,
    modelName: 'Storage',
  });
  return Storage;
};