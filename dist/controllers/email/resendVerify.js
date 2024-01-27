"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const models_1 = require("../../models");
const resendVerify = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw helpers_1.HttpError.set(400, 'Missing required field email');
    }
    const user = await models_1.User.findOne({ email }).exec();
    if (!user) {
        throw helpers_1.HttpError.set(404, 'Email not found');
    }
    if (user.verify) {
        throw helpers_1.HttpError.set(400, 'Verification has already been passed');
    }
    const verificationEmail = (0, helpers_1.verifyEmail)(email, user.verificationToken);
    await (0, helpers_1.sendEmail)(verificationEmail);
    res.status(200).json({
        code: 200,
        message: 'Verification email sent',
    });
};
exports.default = resendVerify;
//# sourceMappingURL=resendVerify.js.map