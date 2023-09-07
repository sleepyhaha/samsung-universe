const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection.js"); //SQL connection
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");

require("./models"); // Import models

// SETUP express
const server = express();
server.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: '*',

}
server.use(cors(corsOptions))

// server.use(routes)

// SETUP express-session
server.use(session({

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

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