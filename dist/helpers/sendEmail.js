"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const { MAILTRAP_USER, MAILTRAP_PASSWORD } = process.env;
const transporter = nodemailer_1.default.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASSWORD,
    },
});
const sendEmail = async (data) => {
    const email = {
        ...data,
        from: 'dimakozakov1999@gamil.com',
    };
    await transporter.sendMail(email);
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map