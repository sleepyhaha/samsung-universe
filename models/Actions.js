const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Users = require("./Users");


class Actions extends Model { };

Actions.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: "Actions",
    }

);

module.exports = Actions; 