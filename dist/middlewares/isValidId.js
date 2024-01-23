"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const index_1 = require("../helpers/index");
const isValidId = (req, _, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw index_1.HttpError.set(400, `${id} isn\`t valid id`);
    }
    next();
};
exports.default = isValidId;
//# sourceMappingURL=isValidId.js.map