const { DataTypes } = require('sequelize');

// Connect to sequelize and export the function model

module.exports = (sequelize) => {
  // Defining model
  sequelize.define('visitDate', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      isIn: [['Confirmed', 'Pending', 'Expired', 'Cancelled']],
    },
    title: {
      type: DataTypes.STRING,
    },
  });
};
