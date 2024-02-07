"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../models/token"));
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
class TokenService {
    generateToken(payload) {
        if (typeof JWT_ACCESS_SECRET === 'string' && typeof JWT_REFRESH_SECRET === 'string') {
            const accessToken = jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
            const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
            return {
                accessToken,
                refreshToken,
            };
        }
    }
    validateAccessToken(token) {
        if (typeof JWT_ACCESS_SECRET !== 'string') {
            return null;
        }
        const userData = jsonwebtoken_1.default.verify(token, JWT_ACCESS_SECRET);
        return userData;
    }
    validateRefreshToken(token) {
        if (typeof JWT_REFRESH_SECRET !== 'string') {
            return null;
        }
        const userData = jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
        return userData;
    }
    async saveToken(id, refreshToken) {
        const tokenData = await token_1.default.findOne({ tokenData: id });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await token_1.default.create({ user: id, refreshToken });
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await token_1.default.deleteOne({ refreshToken });
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await token_1.default.findOne({ refreshToken });
        return tokenData;
    }
}
exports.default = new TokenService();
//# sourceMappingURL=TokenService.js.map