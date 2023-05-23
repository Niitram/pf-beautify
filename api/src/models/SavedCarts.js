const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo de carritos guardados de los clientes
module.exports = (sequelize) => {
  sequelize.define("SavedCart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
};
