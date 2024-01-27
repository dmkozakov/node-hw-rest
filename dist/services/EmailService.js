"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class EmailService {
    async verify(id) {
        const result = await models_1.User.findByIdAndUpdate(id, { verify: true, verificationToken: null }, { new: true }).exec();
        return result || null;
    }
}
exports.default = new EmailService();
//# sourceMappingURL=EmailService.js.map