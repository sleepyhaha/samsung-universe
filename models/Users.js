const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Users extends Model { };

Users.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        activateCode: {
            type: DataTypes.STRING(4),
            allowNull: true,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: "users",
    }

);

module.exports = Users; 