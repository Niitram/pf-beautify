const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Profesional",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      adress: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
