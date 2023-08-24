const Sequelize = require("sequelize");

//TODO: setup dotenv package

// require("dotenv").config();

// process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,

const sequelize = new Sequelize(
    "name_db",
    "root",
    "root",
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }
);

module.exports = sequelize;