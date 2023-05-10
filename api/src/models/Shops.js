const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Shop", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
  });
};
