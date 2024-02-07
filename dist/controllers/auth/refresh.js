"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData = await services_1.AuthService.refresh(refreshToken);
    if (!userData) {
        throw helpers_1.HttpError.set(404);
    }
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({
        code: 200,
        data: userData,
    });
};
exports.default = refresh;
//# sourceMappingURL=refresh.js.map