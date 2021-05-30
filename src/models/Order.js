const { DataTypes } = require('sequelize');

// Connect to sequelize and export the function model

module.exports = (sequelize) => {
  // Defining model
  sequelize.define('order', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('expired', 'active'),
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
