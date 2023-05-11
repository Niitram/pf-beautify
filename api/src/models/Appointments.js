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
            profesionalId:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            clientId:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            serviceId:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            hour: {
                type: DataTypes.TIME,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};
