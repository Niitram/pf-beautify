const { DataTypes } = require("sequelize");

//* Definiendo la función que crea el modelo Admins
module.exports = (sequelize) => {
    sequelize.define(
        "Appointment",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            hour: {
                type: DataTypes.TIME,
                allowNull: false
            },
            paid: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};
