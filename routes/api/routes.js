
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

//Saves itinerary
router.post('/', (req, res) => {
    Itineraries.create({
        depart_date: req.body.depart_date,
        return_date: req.body.return_date,
        depart_location: req.body.depart_location,
        arrival_location: req.body.arrival_location,
    })
        .then((newAction) => {
            res.json(newAction);
        })
        .catch((err) => {
            res.json(err);
        });
});

//Saves Action
router.post('/', (req, res) => {
    Actions.create({
        title: req.body.title,
        content: req.body.content,
        image_01_link: req.body.image_01_link,
        where: {
            itinerariesId: currentItinerary
        }
    })
        .then((newAction) => {
            res.json(newAction);
        })
        .catch((err) => {
            res.json(err);
        });
});