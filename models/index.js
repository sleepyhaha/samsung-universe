const Users = require("./Users");
const Itineraries = require("./Itineraries");
const Actions = require("./Actions");

Users.hasMany(Actions, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

Actions.belongsTo(Users, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

// Itineraries.hasMany(Actions, {
//     // foreignKey: "itinerariesId"
// });
// Actions.belongsTo(Itineraries);