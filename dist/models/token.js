"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const tokenSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
}, { versionKey: false, timestamps: true });
tokenSchema.post('save', { errorHandler: true }, helpers_1.handleMongooseError);
const Token = (0, mongoose_1.model)('Token', tokenSchema);
exports.default = Token;
//# sourceMappingURL=token.js.map