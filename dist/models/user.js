"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const index_1 = require("../helpers/index");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: 'starter',
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });
userSchema.post('save', index_1.handleMongooseError);
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map