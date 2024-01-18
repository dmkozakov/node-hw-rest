"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
const handleMongooseError = (err, _, next) => {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        next(HttpError_1.HttpError.setHttpError(400, err.message));
    }
    else {
        next();
    }
};
exports.default = handleMongooseError;
//# sourceMappingURL=handleMongooseError.js.map