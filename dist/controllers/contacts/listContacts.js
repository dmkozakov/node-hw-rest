"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const listContacts = async (req, res) => {
    const result = await index_1.Contact.find();
    res.json(result);
};
exports.default = listContacts;
//# sourceMappingURL=listContacts.js.map