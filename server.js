const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./db/connection.js"); //SQL connection
const path = require("path");
require("./models"); // Import models

// SETUP express
const server = express();
const PORT = process.env.PORT || 3001;

// SETUP express-handlebars
const hbs = exphbs.create({});
server.engine("handlebars", hbs.engine);
server.set("view engine", "handlebars");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));

server.use(require("./controllers"));

sequelize.sync({ force: false }).then(() => {

    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

});