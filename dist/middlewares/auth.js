"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const index_2 = require("../helpers/index");
const services_1 = require("../services");
const auth = async (req, _, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' && token) {
        next(index_2.HttpError.set(401));
    }
    try {
        const userData = services_1.TokenService.validateAccessToken(token);
        if (!userData) {
            next(index_2.HttpError.set(401));
        }
        const user = await index_1.User.findById(userData.id).exec();
        if (user) {
            if (!user.accessToken || user.accessToken !== token) {
                next(index_2.HttpError.set(401));
            }
            req.user = user;
            next();
        }
    }
    catch (error) {
        next(index_2.HttpError.set(401));
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map