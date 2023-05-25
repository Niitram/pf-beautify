const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo CartsProducts
module.exports = (sequelize) => {
  sequelize.define(
    "CartsProducts",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
