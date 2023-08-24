const Sequelize = require("sequelize");
require("dotenv").config();

// process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,

const sequelize = new Sequelize(
    "db_name",
    "root",
    "root",
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }
);

module.exports = sequelize;