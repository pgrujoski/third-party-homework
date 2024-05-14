const fs = require("fs");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const config = require("../config");

const mailTemplate = {
    PASWORD_TEMPLATE: {
        title: "Your password reset link has been generated",
        template: "reset_password.html",
    },
    WELCOME: {
        title: "Welcome to the class of learning mailgun!",
        template: "welcome.html",
    }
}

const sendMail = async (to, type, data) => {
    const mg = mailgun.client({
        username: "api",
        key: 
            config.getSection("development").api_key || 
            ""
    });

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
        const res = await mg.messages.create(
            config.getSection("development").domain,
            options
        );

        return res;

    }catch(err){
        throw err;
    }

}

const readTemplate = async (file) => {
    return new Promise((success, fail) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if(err) return fail(err);
            return success(data);
        });
    });
};

module.exports = {
    sendMail,
}
