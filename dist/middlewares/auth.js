"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const index_1 = require("../helpers/index");
const { JWT_SECRET } = process.env;
const auth = async (req, _, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' && token) {
        next(index_1.HttpError.set(401));
    }
    try {
        if (typeof JWT_SECRET === 'string') {
            const { id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const user = await models_1.User.findById(id).exec();
            if (user) {
                if (!user.token || user.token !== token) {
                    next(index_1.HttpError.set(401));
                }
                req.user = user;
            }
            next();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map