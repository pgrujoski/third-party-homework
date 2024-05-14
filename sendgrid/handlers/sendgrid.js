const { sendMail } = require ("../pkg/sendgrid");
const { validate, SendGridFields } = require("../pkg/sendgrid/validate");

const sendWelcomeMail = async (req, res) => {
    try {
        await validate(req.body, SendGridFields);
        const result = await sendMail(req.body.to, "WELCOME", req.body.message);
        return res.status(201).send(result);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const sendPasswordResetMail = async (req, res) => {
    try {
        const result = await sendMail(req.body.to, "PASSWORD_TEMPLATE", req.body.message);
        return res.status(201).send(result);
    }catch(err){
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    sendPasswordResetMail,
    sendWelcomeMail
}
