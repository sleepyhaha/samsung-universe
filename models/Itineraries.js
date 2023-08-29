const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Itineraries extends Model { };

Itineraries.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        usersId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        depart_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        //return_date to be used IF isRoundTrip is true.
        return_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        depart_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        arrival_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //isRoundTrip is currently an extra feature so that the user can tick it to add in a return date.
        //allowNull to be set to false if used in live application.
        isRoundTrip: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: "itineraries",
    }

);

module.exports = Itineraries; 