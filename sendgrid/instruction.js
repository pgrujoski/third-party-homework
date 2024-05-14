
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'petar.grujoski@icloud.com', // Change to your recipient
  from: 'petar.grujoski@icloud.com', // Change to your verified sender
  subject: 'Nauciv da pustam mejlovi so SandGrid',
  text: 'Kreirav account, dodadov verified mail i integrirav so gotoviot kod za node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })