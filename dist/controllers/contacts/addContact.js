"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const addContact = async (req, res) => {
    const result = await index_1.Contact.create(req.body);
    res.status(201).json(result);
};
exports.default = addContact;
//# sourceMappingURL=addContact.js.map