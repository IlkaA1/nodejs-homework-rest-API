const nodemailer = require("nodemailer");
require("dotenv").config();

const PASSWORD = process.env.PASSWORD;

const config = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9c7a8eb3c86925",
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMail = (emailOptions) => {
  emailOptions.from = "kamashilonka@meta.ua";
  return transporter.sendMail(emailOptions);
};

module.exports = sendMail;
