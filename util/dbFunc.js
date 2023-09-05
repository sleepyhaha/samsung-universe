const bcrypt = require("bcrypt");

const { sendCode } = require("./smtpFunc.js");
const { generateCode } = require("./common.js");

const Users = require("../models/Users");
const Itineraries = require("../models/Itineraries");
const Actions = require("../models/Actions");

// TABLE OF CONTENTS
// (1) createUser - CREATE A USER
// (2) createItinerary - CREATE AN ITINERARY
// (3) createAction - CREATE AN ACTION
// (4) getAllUsers - GET ALL ITEMS FROM USERS TABLE
// (5) getItineraryByUserId [including actions] - GET AN ITINERARY BY A USER ID
// (6) updateItineraryByUserId - UPDATE ITINERARY BY A USER ID
// TODO: (7) updateUserActions
// TODO: (8) resetPassword
// (9) getPasswordByUsername - GET PASSWORD BY USERNAME
// (10) checkPassword - CHECK INPUT PASSWORD AGAINST DATABASE PASSWORD [ACCOUNT LOGIN]
// (11) checkAccountActivated - (11) CHECK IF THE ACCOUNT HAS BEEN ACTIVATED
// (12) checkActivateCode - CHECK IF ACCOUNT CONFIRMATION CODE IS CORRECT

// ---

// (1) CREATE A USER
// DESCRIPTION: 
// SAMPLE FUNCTION:
// createUser({
//     email: "ananfro@live.com",
//     username: "broski69",
//     password: "alexiscool123",
// });

async function createUser(req) {

    //TODO: Make randomised activateCode

    const newUser = {

        email: req.email,
        activateCode: generateCode(4),
        username: req.username,
        password: req.password,

    }

    await sendCode(newUser);

    newUser.password = await bcrypt.hash(newUser.password, 10);

    await Users.create(newUser);

}

// (2) CREATE AN ITINERARY
// DESCRIPTION: N/A.
// SAMPLE FUNCTION:
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
// SAMPLE FUNCTION:
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
// RETURN SAMPLE:
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
// DESCRIPTION: This function takes the user's ID (INTEGER) as an argument.
// Returns an object that includes user, itinerary and action data.
// SAMPLE FUNCTION: getItineraryByUserId(1) -> returns data from user with id = 1
// RETURN SAMPLE:
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
// SAMPLE FUNCTION:
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

// (9) GET PASSWORD BY USERNAME
// DESCRIPTION: This function accepts a valid username as an argument,
// and returns the hashed password of the user from the database.
// This function is used for (10) checkPassword.

async function getPasswordByUsername(username) {

    // TODO: TRY/CATCH if the username doesn't exist in the DB

    const user = await Users.findOne({
        where: {
            username: username,
        }
    });

    return user.password;

}

// (10) CHECK INPUT PASSWORD AGAINST DATABASE PASSWORD [ACCOUNT LOGIN]
// DESCRIPTION: Receives a request with a username and password,
// compares the unhashed input password with the hashed password stored in the database associated with the input username.
// RETURNS: 0 if the password is incorrect, 1 if the password is correct, 2 if the username does not exist
// SAMPLE FUNCTION:
// checkPassword({
//     username: "broski69",
//     password: "alexiscool123",
// });

//EXTRA TODO: if the account doesn't exist, return 2.

async function checkPassword(req) {

    const isPassword = await bcrypt.compare(
        req.password, // compare unhashed user input password
        await getPasswordByUsername(req.username)); // with hashed password in database

    if (isPassword) return 1;
    else return 0;

}

// (11) CHECK IF THE ACCOUNT HAS BEEN ACTIVATED
// DESCRIPTION: This function accepts a username as an argument and checks IF users.isActivated is true, return true.
// IF false, then return false
// SAMPLE FUNCTION:
// checkAccountActivated("broski69");

async function checkAccountActivated(username) {

    const userData = await Users.findOne({
        where: {
            username: username,
        },
        raw: true,
    });

    if (userData.isActivated === 1) return true;
    else return false;

}

// (12) CHECK IF ACCOUNT CONFIRMATION CODE IS CORRECT
// DESCRIPTION: An object parameter is accepted, format seen in the SAMPLE FUNCTION section.
// The function compares the input with the database. IF both are the same, then set isActivated to true for that user,
// and return true.
// IF input is different to the database, return false.
// SAMPLE FUNCTION:
// checkActivateCode({

//     username: "broski69",
//     inputActivateCode: "1234", // MUST BE A STRING

// });

async function checkActivateCode(user) {

    // Pulls the user's data from DB
    const userData = await Users.findOne({
        where: {
            username: user.username,
        },
        raw: true,
    });

    // Check to see if the input code is the same as what's in the DB
    // IF true, then set activateCode to true for the user and update it in the DB
    if (userData.activateCode === user.inputActivateCode) {

        userData.isActivated = true;

        await Users.update(userData, {
            where: {
                id: userData.id,
            }
        });

        return true;

    } else return false;

}

module.exports = {

    createUser,
    createItinerary,
    createAction,
    getAllUsers,
    getItineraryByUserId,
    updateItineraryByUserId,
    checkPassword,
    checkAccountActivated,
    checkActivateCode,

}