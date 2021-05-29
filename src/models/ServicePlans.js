const { DataTypes } = require('sequelize');

// Connect to sequelize and export the function model

module.exports = (sequelize) => {
  // Defining model
  sequelize.define('servicePlans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Descripción vacía',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    numberPhotos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
