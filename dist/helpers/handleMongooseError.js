"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseError = void 0;
const HttpError_1 = require("./HttpError");
const handleMongooseError = (err, _, next) => {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        const status = err.name === 'MongoServerError' && err.code === 11000 ? 409 : 400;
        next(HttpError_1.HttpError.set(status, err.message));
    }
    else {
        next();
    }
};
exports.handleMongooseError = handleMongooseError;
//# sourceMappingURL=handleMongooseError.js.map