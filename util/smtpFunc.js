const smtp = require("../config/smtp");

async function sendCode(newUser) {

    const info = await smtp.sendMail({
        from: process.env.SMTP_USER, // sender address
        to: req.email, // list of receivers
        subject: "Account Confirmation - Xande Technologies", // Subject line
        text: `Please confirm your account`, // plain text body
        html: "CODE HERE", // html body
    });

}