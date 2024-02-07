"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await models_1.User.findOne({ email }).exec();
    if (!user) {
        throw helpers_1.HttpError.set(401, 'Email or password invalid');
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw helpers_1.HttpError.set(401, 'Email or password invalid');
    }
    if (!user.verify) {
        throw helpers_1.HttpError.set(401, 'Please verify your email');
    }
    const result = await services_1.AuthService.login(user._id);
    const token = result === null || result === void 0 ? void 0 : result.accessToken;
    res.cookie('refreshToken', result === null || result === void 0 ? void 0 : result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    if (!token) {
        throw helpers_1.HttpError.set(401);
    }
    res.status(200).json({
        code: 200,
        data: {
            user: {
                email: result.email,
                subscription: result.subscription,
            },
            tokens: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            },
        },
    });
};
exports.default = login;
//# sourceMappingURL=login.js.map