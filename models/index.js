const Users = require("./Users");
const Itineraries = require("./Itineraries");
const Actions = require("./Actions");

Users.hasMany(Actions, {
    foreignKey: 'username',
    onDelete: 'CASCADE',
});

Actions.belongsTo(Users, {
    foreignKey: 'username',
    onDelete: 'CASCADE',
});

// Itineraries.hasMany(Actions, {
//     // foreignKey: "itinerariesId"
// });
// Actions.belongsTo(Itineraries);