const Logger = require("../models/log_loginAttempt");

async function log_loginAttempt(req, loginStatus) {

    const request = {

        username: req.body.username,
        ip_address: req.ip,
        loginAttempt: loginStatus,

    }

    await Logger.create(request);

}

async function log_readLog() {

    return await Logger.findAll({
        raw: true,
    });

}


module.exports = {

    log_loginAttempt,
    log_readLog,

}