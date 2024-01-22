"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../models");
const { JWT_SECRET } = process.env;
class AuthService {
    async register(req) {
        const { email, password, subscription } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await models_1.User.create({ email, password: hashedPassword, subscription });
        return newUser || null;
    }
    async login(id) {
        const payload = { id };
        if (typeof JWT_SECRET === 'string') {
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '2h' });
            const result = await models_1.User.findByIdAndUpdate(id, { token }, { new: true }).exec();
            return result || null;
        }
        return null;
    }
    async logout(req) {
        const { _id } = req.user;
        const result = await models_1.User.findByIdAndUpdate(_id, { token: null }, { new: true });
        return result || null;
    }
    async updateSubscription(req) {
        const { id } = req.params;
        const result = await models_1.User.findByIdAndUpdate(id, req.body, { new: true });
        return result || null;
    }
}
exports.default = new AuthService();
//# sourceMappingURL=AuthService.js.map