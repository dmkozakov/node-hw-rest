import nodemailer from 'nodemailer';

const { MAILTRAP_USER, MAILTRAP_PASSWORD } = process.env;

interface Email {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});

const sendEmail = async (data: Email) => {
  const email = {
    ...data,
    from: 'dimakozakov1999@gamil.com',
  };

  await transporter.sendMail(email);
};

export default sendEmail;
