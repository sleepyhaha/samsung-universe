const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

const { sendCode } = require("./smtpFunc.js");

const Users = require("../models/Users");
const Itineraries = require("../models/Itineraries");
const Actions = require("../models/Actions");

// TABLE OF CONTENTS
// (1) createUser
// (2) createItinerary
// (3) createAction
// (4) getAllUsers
// (5) getItineraryByUserId [including actions]
// (6) updateItineraryByUserId
// TODO: (7) updateUserActions
// TODO: (8) resetPassword
// (9) getPasswordByUsername
// (10) checkPassword

// ---

// (1) CREATE A USER
// DESCRIPTION: 
// EXAMPLE:
// createUser({
//     username: "broski69",
//     password: "alexiscool123",
// });

async function createUser(req) {

    const newUser = {

        email: req.email,
        username: req.username,
        password: req.password,

    }

    sendCode(newUser);

    newUser.password = await bcrypt.hash(newUser.password, 10);

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

        userId: req.userId,
        depart_date: req.depart_date,
        return_date: req.return_date,
        depart_location: req.depart_location,
        arrival_location: req.arrival_location,
        isRoundTrip: req.isRoundTrip,

    }

    await Itineraries.create(newItinerary);

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

        itineraryId: req.itineraryId,
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

// (4) GET ALL ITEMS FROM USERS TABLE
// DESCRIPTION: Returns an array of objects, each user is an object.
// RETURNS:
// [{
//     id: 1,
//     username: 'admin',
//     password: 'admin123',
//     createdAt: 2023-08-29T11:41:39.000Z,
//     updatedAt: 2023-08-29T11:41:39.000Z
//   }]

async function getAllUsers() {

    return await Users.findAll({
        raw: true,
    });

}

// (5) GET AN ITINERARY BY A USER ID
// DESCRIPTION: Returns an object that includes user, itinerary and action data.
// EXAMPLE: getItineraryByUserId(1) -> returns data from user with id = 1
// RETURN EXAMPLE:
// {
//     id: 1,
//     username: 'admin',
//     password: 'admin123',
//     createdAt: 2023-08-31T09:11:56.000Z,
//     updatedAt: 2023-08-31T09:11:56.000Z,
//     itineraries: [
//       {
//         id: 1,
//         depart_date: 2023-08-29T02:07:32.000Z,
//         return_date: 2023-08-29T02:07:32.000Z,
//         depart_location: 'Melbourne',
//         arrival_location: 'New Zealand',
//         isRoundTrip: false,
//         createdAt: 2023-08-31T09:11:56.000Z,
//         updatedAt: 2023-08-31T09:11:56.000Z,
//         userId: 1,
//         actions: [Array]
//       }
//     ]
//   }

async function getItineraryByUserId(selectUserId) {

    const userData = await Users.findByPk(selectUserId, {
        include: [{ model: Itineraries, include: [{ model: Actions }] }]
    });

    return userData.get({ plain: true });

}

// (6) UPDATE ITINERARY BY A USER ID
// DESCRIPTION: N/A.
// EXAMPLE:
//  updateItineraryByUserId({
//     userId: 1,
//     depart_date: "2024-08-29 12:07:32",
//     return_date: "2026-08-29 12:07:32",
//     depart_location: "Melbourne",
//     arrival_location: "Los Angeles",
//     isRoundTrip: false,
// });

async function updateItineraryByUserId(req) {

    const userItineraryUpdated = {
        userId: req.userId,
        depart_date: req.depart_date,
        return_date: req.return_date,
        depart_location: req.depart_location,
        arrival_location: req.arrival_location,
        isRoundTrip: req.isRoundTrip,
    }

    await Itineraries.update(userItineraryUpdated,
        {
            where: {
                userId: req.userId,
            }
        });

}

// 
// DESCRIPTION: Receives a request with a username and password,
// compares the unhashed input password with the hashed password stored in the database associated with the input username.
// RETURNS: 

async function getPasswordByUsername(username) {

    // TODO: TRY/CATCH if the username doesn't exist in the DB

    const user = await Users.findOne({
        where: {
            username: username,
        }
    });

    return user.password;

}

// 
// DESCRIPTION: Receives a request with a username and password,
// compares the unhashed input password with the hashed password stored in the database associated with the input username.
// RETURNS: 0 if the password is incorrect, 1 if the password is correct, 2 if the username does not exist
// EXAMPLE:
// checkPassword({
//     username: "broski69",
//     password: "alexiscool123",
// });

//TODO: if the account doesn't exist.

async function checkPassword(req) {

    const isPassword = await bcrypt.compare(
        req.password, // compare unhashed user input password
        await getPasswordByUsername(req.username)); // with hashed password in database

    if (isPassword) return 1
    else return 0

}

// DELETE: TEST SEEDS

// createUser({
//     username: "admin",
//     password: "admin123",
// });
// createUser({
//     username: "admin1",
//     password: "admin123",
// });
// createUser({
//     username: "admin2",
//     password: "admin123",
// });

// createItinerary({
//     userId: 1,
//     depart_date: "2023-08-29 12:07:32",
//     return_date: "2023-08-29 12:07:32",
//     depart_location: "Melbourne",
//     arrival_location: "New Zealand",
//     isRoundTrip: false,
// });

// createAction({

//     itineraryId: 1,
//     title: "Jungle Bungle",
//     content: "It's a pretty cool forest!",
//     source_link: "https://www.google.com",
//     image_01_link: "https://www.amazon.com",
//     image_02_link: "https://www.facebook.com",
//     image_03_link: "https://www.youtube.com",
//     image_04_link: "https://www.reddit.com",
//     image_05_link: "https://www.twitter.com",

// });

module.exports = {

    createUser,
    createItinerary,
    createAction,
    getAllUsers,
    getItineraryByUserId,
    updateItineraryByUserId,
    checkPassword,

}