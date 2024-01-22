"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const validateQuery = (schema) => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.query);
        if (error) {
            next(helpers_1.HttpError.set(400, error.message));
        }
        next();
    };
    return func;
};
exports.default = validateQuery;
//# sourceMappingURL=validateQuery.js.map