const { DataTypes } = require("sequelize");

//* Definiendo el modelo Developers (info para el about)

module.exports = (sequelize) => {
  sequelize.define(
    "Developer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isUrl: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      github: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isUrl: true },
      },
    },
    { timestamps: false }
  );
};
