"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const isValidId = (req, _, next) => {
    const { contactId } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(contactId)) {
        next(helpers_1.HttpError.setHttpError(400, `${contactId} isn\`t valid id`));
    }
    next();
};
exports.default = isValidId;
//# sourceMappingURL=isValidId.js.map