"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = __importDefault(require("../../services/EmailService"));
const resendVerify_1 = __importDefault(require("./resendVerify"));
exports.default = { verify: EmailService_1.default.verify, resendVerify: resendVerify_1.default };
//# sourceMappingURL=index.js.map