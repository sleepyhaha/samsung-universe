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
        account: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: "username",
            },
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
            type: DataTypes.STRING,
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