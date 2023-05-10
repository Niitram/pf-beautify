const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo Categorys
module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

};
