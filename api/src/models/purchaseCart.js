const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo Products
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      preferenceId: {
        allowNull: false,
        type: DataTypes.STRING
      },
      clientMail: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  );
};
