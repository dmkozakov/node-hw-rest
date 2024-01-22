"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const AuthService_1 = __importDefault(require("../services/AuthService"));
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
    const result = await AuthService_1.default.login(user._id);
    const token = result === null || result === void 0 ? void 0 : result.token;
    if (!token) {
        throw helpers_1.HttpError.set(401);
    }
    res.status(200).json({
        code: 200,
        data: {
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        },
    });
};
exports.default = login;
//# sourceMappingURL=login.js.map