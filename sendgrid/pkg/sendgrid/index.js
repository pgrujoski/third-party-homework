const sgMail = require('@sendgrid/mail');
const fs = require('fs')
const dotenv = require('dotenv');
const config = require("../config");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailTemplate = {
    PASSWORD_TEMPLATE: {
        title: "Your password reset link has been generated",
        template: "reset_password.html",
    },
    WELCOME: {
        title: "Welcome to the class of learning SendGrid!",
        template: "welcome.html",
    }
};

const readTemplate = async (file) => {
    return new Promise((success, fail) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if(err) return fail(err);
            return success(data);
        });
    });
};


const sendMail = async (to, type, data) => {

    let title = mailTemplate[type].title;
    let templatePath = `${__dirname}/../../email_templates/${mailTemplate[type].template}`;
    let content = await readTemplate(templatePath);

    for (let i in data){
     
        let regex = new RegExp(`\{\{${i}\}\}`, "g"); 
        content = content.replace(regex, data[i]);
    };

    let options = {
        from: config.getSection("development").sender_email,
        to: to,
        subject: title,
        html: content
    }

    try{
        const res = await sgMail.send(options)
        return res;

    }catch(err){
        throw err;
    }

}

module.exports = {
    sendMail,
};