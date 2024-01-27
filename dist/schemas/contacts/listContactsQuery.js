"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const listContactsQuery = joi_1.default.object({
    favorite: joi_1.default.string().valid('true', 'false'),
    page: joi_1.default.string(),
    limit: joi_1.default.string(),
});
exports.default = listContactsQuery;
//# sourceMappingURL=listContactsQuery.js.map