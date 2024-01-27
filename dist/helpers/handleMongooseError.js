"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
const handleMongooseError = (err, _, next) => {
    if (err.name === 'MongoServerError') {
        const status = err.code === 11000 ? 409 : 400;
        next(HttpError_1.default.set(status, err.message));
    }
    next();
};
exports.default = handleMongooseError;
//# sourceMappingURL=handleMongooseError.js.map