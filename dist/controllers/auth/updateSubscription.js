"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const AuthService_1 = __importDefault(require("../services/AuthService"));
const updateSubscription = async (req, res) => {
    const result = await AuthService_1.default.updateSubscription(req);
    if (!result) {
        throw helpers_1.HttpError.set(404);
    }
    res.status(201).json({ code: 201, data: result });
};
exports.default = updateSubscription;
//# sourceMappingURL=updateSubscription.js.map