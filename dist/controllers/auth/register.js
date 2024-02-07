"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw helpers_1.HttpError.set(400, 'Missing required fields');
    }
    const user = await models_1.User.findOne({ email }).exec();
    if (user) {
        throw helpers_1.HttpError.set(409, 'Email already in use');
    }
    const newUser = await services_1.AuthService.register(req);
    res.cookie('refreshToken', newUser === null || newUser === void 0 ? void 0 : newUser.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    if (!newUser) {
        throw helpers_1.HttpError.set(400, 'Unable to register, try again later');
    }
    res.status(201).json({
        code: 201,
        data: {
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
            },
            tokens: {
                accessToken: newUser.accessToken,
                refreshToken: newUser.refreshToken,
            },
        },
    });
};
exports.default = register;
//# sourceMappingURL=register.js.map