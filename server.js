const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection.js"); //SQL connection
const path = require("path");
// const bodyParser = require("body-parser");
require("./models"); // Import models

// SETUP express
const server = express();
const PORT = process.env.PORT || 3001;

// SETUP express-session
app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}));

// SETUP express-handlebars
const hbs = exphbs.create({});
server.engine("handlebars", hbs.engine);
server.set("view engine", "handlebars");

// server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));

server.use(require("./controllers"));

sequelize.sync({ force: false }).then(() => {

    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

});