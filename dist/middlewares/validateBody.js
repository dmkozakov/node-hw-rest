"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../helpers/index");
const validateBody = (schema) => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(index_1.HttpError.set(400, error.message));
        }
        next();
    };
    return func;
};
exports.default = validateBody;
//# sourceMappingURL=validateBody.js.map