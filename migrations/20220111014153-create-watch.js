'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Watches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      brand: {
        type: DataTypes.STRING
      },
      refNumber: {
        type: DataTypes.INTEGER
      },
      orderID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      storageID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Watches');
  }
};