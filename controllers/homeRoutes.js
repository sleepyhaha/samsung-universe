const router = require("express").Router();
const {

    createUser,
    createItinerary,
    createAction,
    getAllUsers,
    getItineraryByUserId,
    updateItineraryByUserId,
    checkPassword,
    checkAccountActivated,
    checkActivateCode,

} = require("../util/dbFunc");

// PATH: localhost/

router.get("/", (req, res) => {

    res.render("main");

});

router.get("/login", (req, res) => {

    res.render("login");

});

router.get("/createaccount", (req, res) => {

    res.render("create-account");

});

router.post("/createuser", async (req, res) => {

    createUser(req.body);
    res.status(200).json();

});

module.exports = router;