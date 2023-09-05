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


    const sessionData = {
        username: req.session.username,
        loggedIn: req.session.loggedIn
    };

    if (req.session.loggedIn === true) {

        res.render("main", { sessionData });

    }

    else {

        res.render("login");

    }

    // res.render("main");

});

// LOGIN

router.get("/login", (req, res) => {

    res.render("login");

});

router.post("/login", async (req, res) => {

    const login = await checkPassword(req.body);

    if (login === 0) {

        req.session.loggedIn = false;
        res.status(400).json();

    }
    else if (login === 1) {

        req.session.loggedIn = true;
        req.session.username = req.body.username;
        res.status(200).json();

    }

});

// LOGOUT

router.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.render("login");
    });

});

// CREATE ACCOUNT

router.get("/createaccount", (req, res) => {

    res.render("create-account");

});

router.post("/createuser", async (req, res) => {

    await createUser(req.body);
    res.json(req.body.username);

});

// ACCOUNT CONFIRMATION

router.get("/accountconfirm", (req, res) => {

    res.render("account-confirmation");

});

router.post("/accountconfirm", async (req, res) => {

    const correctCode = await checkActivateCode(req.body);

    if (correctCode) { res.status(200).json(); }
    else { res.status(400).json(); }

});

module.exports = router;