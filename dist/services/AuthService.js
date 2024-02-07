"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const gravatar_1 = __importDefault(require("gravatar"));
const jimp_1 = __importDefault(require("jimp"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const avatarsDir = path_1.default.join(process.cwd(), 'public', 'avatars');
const uploadDir = path_1.default.join(process.cwd(), 'tmp');
const TokenService_1 = __importDefault(require("./TokenService"));
const dtos_1 = require("../dtos");
class AuthService {
    async register(req) {
        const { email, password, subscription } = req.body;
        const avatarURL = gravatar_1.default.url(email);
        const verificationToken = node_crypto_1.default.randomUUID();
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await models_1.User.create({
            email,
            password: hashedPassword,
            subscription,
            avatarURL,
            verificationToken,
        });
        const userDto = new dtos_1.UserDto(newUser);
        const tokens = TokenService_1.default.generateToken({ ...userDto });
        if (!tokens) {
            return null;
        }
        await TokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
        newUser.accessToken = tokens.accessToken;
        newUser.refreshToken = tokens.refreshToken;
        await newUser.save();
        const verificationEmail = (0, helpers_1.verifyEmail)(email, verificationToken);
        await (0, helpers_1.sendEmail)(verificationEmail);
        return newUser || null;
    }
    async login(id) {
        const user = await models_1.User.findOne(id).exec();
        if (!user) {
            return null;
        }
        const userDto = new dtos_1.UserDto(user);
        const tokens = TokenService_1.default.generateToken({ ...userDto });
        if (!tokens) {
            return null;
        }
        await TokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        return user || null;
    }
    async logout(req) {
        const { refreshToken } = req.cookies;
        await TokenService_1.default.removeToken(refreshToken);
        const { _id } = req.user;
        const result = await models_1.User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null }, { new: true });
        return result || null;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw helpers_1.HttpError.set(401);
        }
        const userData = TokenService_1.default.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService_1.default.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw helpers_1.HttpError.set(401);
        }
        const user = await models_1.User.findById(userData.id);
        if (!user) {
            return null;
        }
        const userDto = new dtos_1.UserDto(user);
        const tokens = TokenService_1.default.generateToken({ ...userDto });
        if (!tokens) {
            return null;
        }
        await TokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        return user || null;
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
        const result = await models_1.User.findByIdAndUpdate(_id, { avatarURL }, { new: true }).exec();
        return result || null;
    }
}
exports.default = new AuthService();
//# sourceMappingURL=AuthService.js.map