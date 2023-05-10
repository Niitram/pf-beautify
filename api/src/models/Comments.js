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
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },

        },
        { timestamps: false }
    );
}