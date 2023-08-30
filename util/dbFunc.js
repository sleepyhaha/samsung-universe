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

    // TODO: HASH PASSWORD

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

// (3) CREATE AN ACTION
// DESCRIPTION: N/A.
// EXAMPLE:
// createAction({

//     itinerariesId: 1,
//     title: "Forest Trail",
//     content: "It's a pretty cool forest!",
//     source_link: "https://www.google.com",
//     image_01_link: "https://www.amazon.com",
//     image_02_link: "https://www.facebook.com",
//     image_03_link: "https://www.youtube.com",
//     image_04_link: "https://www.reddit.com",
//     image_05_link: "https://www.twitter.com",

// });
async function createAction(req) {

    const newAction = {

        itinerariesId: req.itinerariesId,
        title: req.title,
        content: req.content,
        source_link: req.source_link,
        image_01_link: req.image_01_link,
        image_02_link: req.image_02_link,
        image_03_link: req.image_03_link,
        image_04_link: req.image_04_link,
        image_05_link: req.image_05_link,

    }

    await Actions.create(newAction);

}

module.exports = {

    createUser,
    createItinerary,

}