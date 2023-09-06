const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class log_loginAttempt extends Model { };

log_loginAttempt.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIP: true,
            },
        },
        loginAttempt: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        createdAt: "timestamp",
        updatedAt: false,
        freezeTableName: true,
        underscored: false,
        modelName: "log_loginAttempt",
    }

);

module.exports = log_loginAttempt; 