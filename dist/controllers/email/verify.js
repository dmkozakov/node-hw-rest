"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const index_1 = require("../../models/index");
const services_1 = require("../../services");
const verify = async (req, res) => {
    const { token } = req.params;
    const user = await index_1.User.findOne({ verificationToken: token }).exec();
    if (!user) {
        throw helpers_1.HttpError.set(404, 'User not found');
    }
    const result = await services_1.EmailService.verify(user._id);
    if (!result) {
        throw helpers_1.HttpError.set(400, 'Unable to verify email');
    }
    res.status(200).json({
        code: 200,
        message: 'Verification successful',
    });
};
exports.default = verify;
//# sourceMappingURL=verify.js.map