const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Service",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finalRate: {
        type: DataTypes.FLOAT,
        get() {
          const arrayRates = this.getDataValue("arrayRates");

          return arrayRates.length
            ? arrayRates.reduce((acumulator, value) => acumulator + value) /
                arrayRates.length
            : null;
        },
      },
      arrayRates: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        defaultValue: [],
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
