const router = require('express').Router();
const { Actions, Itineraries, Users } = require('../../models');



//Shows user's saved places of interest
//return itineraries and trip info for the user currently logged in
router.get('/', (req, res) => {
    Itineraries.findAll({
        include: [Actions],
        where: {
            userId: loggedInId
        }
    }).then((data) => {
        res.json(data);
    });
});


//Saves place of interest to user account
router.post('/', (req, res) => {
    //Saves action
    Actions.create({
        title: req.body.title,
        content: req.body.content,
        image_01_link: req.body.image_01_link
    })
        .then((newAction) => {
            res.json(newAction);
        })
        .catch((err) => {
            res.json(err);
        });
});