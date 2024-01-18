"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const listContacts_1 = __importDefault(require("./listContacts"));
const getContactById_1 = __importDefault(require("./getContactById"));
const addContact_1 = __importDefault(require("./addContact"));
const updateContact_1 = __importDefault(require("./updateContact"));
const updateStatusContact_1 = __importDefault(require("./updateStatusContact"));
const removeContact_1 = __importDefault(require("./removeContact"));
exports.default = {
    listContacts: (0, helpers_1.ctrlWrapper)(listContacts_1.default),
    getContactById: (0, helpers_1.ctrlWrapper)(getContactById_1.default),
    addContact: (0, helpers_1.ctrlWrapper)(addContact_1.default),
    updateContact: (0, helpers_1.ctrlWrapper)(updateContact_1.default),
    updateStatusContact: (0, helpers_1.ctrlWrapper)(updateStatusContact_1.default),
    removeContact: (0, helpers_1.ctrlWrapper)(removeContact_1.default),
};
//# sourceMappingURL=index.js.map