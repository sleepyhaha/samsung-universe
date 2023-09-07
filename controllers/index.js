const router = require("express").Router();
const apiRoutes = require('./api/routes');

router.use("/", require("./homeRoutes"));

router.use('/api', apiRoutes);

module.exports = router;