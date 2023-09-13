const nodemailer = require("nodemailer");

const { MAILTRAP_USER, MAILTRAP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});

const sendEmail = async data => {
  const email = {
    ...data,
    from: "dimakozakov1999@gamil.com",
  };

  await transporter.sendMail(email);
};

module.exports = sendEmail;
