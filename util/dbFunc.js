const sequelize = require("../config/connection.js");
const Users = require("../models/Users");
const Itinerary = require("../models/Itineraries");
const Actions = require("../models/Actions");

// TABLE OF CONTENTS
// (1) createUser
// (2) createItinerary
// (3) createAction
// (4) getAllUsers
// (5) getItineraryByUser [including actions]
// (6) updateItinerary


// (1) CREATE A USER
// DESCRIPTION: 
// EXAMPLE:
// createUser({
//     username: "admin",
//     password: "admin123",
// });
async function createUser(req) {

    const newUser = {

        username: req.username,
        password: req.password,

    }

    await Users.create(newUser);

}

// (2) CREATE AN ITINERARY
// DESCRIPTION: N/A.
// EXAMPLE:
// createItinerary({
//     usersId: 1,
//     depart_date: "2023-08-29 12:07:32",
//     return_date: "2023-08-29 12:07:32",
//     depart_location: "Melbourne",
//     arrival_location: "New Zealand",
//     isRoundTrip: false,
// });
async function createItinerary(req) {

    const newItinerary = {

        usersId: req.usersId,
        depart_date: req.depart_date,
        return_date: req.return_date,
        depart_location: req.depart_location,
        arrival_location: req.arrival_location,
        isRoundTrip: req.isRoundTrip,

    }

    await Itinerary.create(newItinerary);

}

module.exports = {

    createUser,
    createItinerary,

}