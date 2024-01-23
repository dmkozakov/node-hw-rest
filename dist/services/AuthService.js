"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gravatar_1 = __importDefault(require("gravatar"));
const jimp_1 = __importDefault(require("jimp"));
const models_1 = require("../models");
const { JWT_SECRET } = process.env;
const avatarsDir = path_1.default.join(process.cwd(), 'public', 'avatars');
const uploadDir = path_1.default.join(process.cwd(), 'tmp');
class AuthService {
    async register(req) {
        const { email, password, subscription } = req.body;
        const avatarURL = gravatar_1.default.url(email);
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await models_1.User.create({ email, password: hashedPassword, subscription, avatarURL });
        return newUser || null;
    }
    async login(id) {
        if (typeof JWT_SECRET !== 'string') {
            return;
        }
        const payload = { id };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        const result = await models_1.User.findByIdAndUpdate(id, { token }, { new: true }).exec();
        return result || null;
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
    async updateAvatar(req) {
        const { _id } = req.user;
        const { path: tmpUpload, originalname } = req.file;
        const avatarPath = path_1.default.join(uploadDir, originalname);
        const resizedUpload = `${uploadDir}/resized.jpg`;
        const image = await jimp_1.default.read(avatarPath);
        await image.resize(250, 250).writeAsync(resizedUpload);
        const filename = `${_id}_${originalname}`;
        const resultUpload = path_1.default.join(avatarsDir, filename);
        await promises_1.default.rename(resizedUpload, resultUpload);
        await promises_1.default.unlink(tmpUpload);
        const avatarURL = path_1.default.join('avatars', filename);
        const result = await models_1.User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
        return result || null;
    }
}
exports.default = new AuthService();
//# sourceMappingURL=AuthService.js.map