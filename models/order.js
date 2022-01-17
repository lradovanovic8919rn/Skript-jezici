'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Watch,Users}) {
      this.hasOne(Watch,{foreignKey:'orderID',as:'watch'}),
      this.belongsTo(Users,{foreignKey:'userID',as:'Seller'})

    }
  };
  Order.init({
    date:{
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};