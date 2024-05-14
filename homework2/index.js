const express = require("express");

const config = require("./pkg/config");

const {
    sendWelcomeMail,
    sendPasswordResetMail
} = require("./handlers/mailer");

const api = express();
api.use(express.json());

api.post("/api/v1/welcome-mail", sendWelcomeMail);
api.post("/api/v1/reset-pass-mail", sendPasswordResetMail);

api.listen(config.getSection("development").port, (err) => {
    err 
        ? console.err(err)
        : console.log(
            `Server started on port ${config.getSection("development").port}`
        )
})

