'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Storage,Order}) {
      this.belongsTo(Storage,{foreignKey:'storageID',as:'str'}),
      this.belongsTo(Order,{foreignKey:'orderID',as:'ord'})
    }
  };
  Watch.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Watch',
  });
  return Watch;
};