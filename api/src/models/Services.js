const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo Clients
module.exports = (sequelize) => {
  sequelize.define(
    "Service",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      professionalName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }},
    { timestamps: false }
  );
};
