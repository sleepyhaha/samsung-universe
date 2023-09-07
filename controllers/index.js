const router = require("express").Router();
const apiRoutes = require('./api/routes');

router.use("/", require("./homeRoutes"));
router.use('/api', apiRoutes);

router.use("*", (req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

router.use('/api', apiRoutes);

module.exports = router;