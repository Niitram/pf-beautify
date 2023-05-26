const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ServicesReview",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      title: {
        type: DataTypes.STRING,
      },
      comment: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
