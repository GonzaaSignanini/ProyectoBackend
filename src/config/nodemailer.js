const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.APP_EMAIL, 
      pass: process.env.APP_PWD, 
    },
});

transporter.verify().then(() => {
    console.log('Ready for send emails');
})

module.exports = transporter;

