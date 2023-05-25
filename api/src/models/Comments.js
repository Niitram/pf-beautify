const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo Comments
module.exports = (sequelize) => {
    sequelize.define(
        "Comment",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tittle: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rating: {
                type: DataTypes.DECIMAL,
                defaultValue: 1
            }

        },
        { timestamps: false }
    );
}