"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const AuthService_1 = __importDefault(require("../services/AuthService"));
const logout = async (req, res) => {
    const result = await AuthService_1.default.logout(req);
    if (!result) {
        throw helpers_1.HttpError.set(400);
    }
    res.status(204).send();
};
exports.default = logout;
//# sourceMappingURL=logout.js.map