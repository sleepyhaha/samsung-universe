const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Actions extends Model { };

Actions.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // itinerariesId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: "itineraries",
        //         key: "id",
        //     },
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        source_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_01_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_02_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_03_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_04_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_05_link: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: "actions",
    }

);

module.exports = Actions; 