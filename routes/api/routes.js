
const router = require('express').Router();
const { Actions } = require('../../models/');


//Shows user's saved places of interest
//return itineraries and trip info for the user currently logged in
router.get('/', (req, res) => {
    Actions.findAll({
        where: {
            username: 1
        }
    }).then((data) => {
        res.json(data);
    });
});


//Saves Action
router.post('/', (req, res) => {
    Actions.create({
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        account: req.body.image,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    })
        .then((newAction) => {
            res.json(newAction);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;