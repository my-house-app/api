const { DataTypes } = require('sequelize');

// Connect to sequelize and export the function model

module.exports = (sequelize) => {
  // Defining model
  sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: {
          args: true,
          msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
          fields: [sequelize.fn('lower', sequelize.col('email'))],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
      },
      photo: {
        type: DataTypes.TEXT,
        isUrl: true,
      },
      city: {
        type: DataTypes.STRING,
      },
      street_number: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        isIn: [['User', 'Admin', 'SuperAdmin']],
      },
      status: {
        type: DataTypes.STRING,
        isIn: [['Available', 'Not-available']],
      },
      externalId: {
        type: DataTypes.STRING,
      },
      // favorites: { lo comento porque al moemnto de connectarme a la db da error @renny
      //   type: DataTypes.ARRAY,
      // },

      //  favorites: {
      //    type: DataTypes.ARRAY,
      //  },
    },
    { createdAt: 'created', updatedAt: 'updated' },
  );
};
