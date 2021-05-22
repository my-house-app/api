const { DataTypes } = require('sequelize');

// Connect to sequelize and export the function model

module.exports = (sequelize) => {
  // Defining model
  sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  });
};
