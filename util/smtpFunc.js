const { smtp } = require("../config/smtp.js");

async function sendCode(newUser) {

    const info = await smtp.sendMail({
        from: process.env.SMTP_USER, // sender address
        to: newUser.email, // list of receivers
        subject: "Account Confirmation - Samsung Universe", // Subject line
        text: `Please confirm your account`, // plain text body
        html: `Your account confirmation code is ${newUser.activateCode}`, // html body
    });

}

module.exports = {

    sendCode,

}