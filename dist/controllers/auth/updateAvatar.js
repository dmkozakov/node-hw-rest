"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const updateAvatar = async (req, res) => {
    if (!req.file) {
        throw helpers_1.HttpError.set(400, 'Missing avatar file');
    }
    const result = await services_1.AuthService.updateAvatar(req);
    const avatarURL = result === null || result === void 0 ? void 0 : result.avatarURL;
    if (!result) {
        throw helpers_1.HttpError.set(401, 'Unable to update avatar, try again later');
    }
    res.status(200).json({ code: 200, data: { avatarURL } });
};
exports.default = updateAvatar;
//# sourceMappingURL=updateAvatar.js.map