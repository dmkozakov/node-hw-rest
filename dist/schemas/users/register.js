"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const regexp_1 = require("../regexp");
const register = joi_1.default.object({
    email: joi_1.default.string().pattern(regexp_1.emailRegex).required(),
    password: joi_1.default.string().min(6).required(),
    subscription: joi_1.default.string().valid('starter', 'pro', 'business'),
    avatarUrl: joi_1.default.string(),
});
exports.default = register;
//# sourceMappingURL=register.js.map