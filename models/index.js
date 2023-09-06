const Users = require("./Users");
const Itineraries = require("./Itineraries");
const Actions = require("./Actions");
const log_loginAttempt = require("./log_loginAttempt");

Users.hasMany(Itineraries, {
    // foreignKey: "usersId"
});
Itineraries.belongsTo(Users);

Itineraries.hasMany(Actions, {
    // foreignKey: "itinerariesId"
});
Actions.belongsTo(Itineraries);