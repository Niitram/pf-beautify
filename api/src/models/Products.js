const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo Products
module.exports = (sequelize) => {
  sequelize.define(
    "Product",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
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
    },
    { timestamps: false }
  );
};
