"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const logout = async (req, res) => {
    const result = await services_1.AuthService.logout(req);
    res.clearCookie('refreshToken');
    if (!result) {
        throw helpers_1.HttpError.set(400);
    }
    res.status(204).send();
};
exports.default = logout;
//# sourceMappingURL=logout.js.map