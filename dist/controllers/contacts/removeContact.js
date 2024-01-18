"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const helpers_1 = require("../../helpers");
const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await index_1.Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw helpers_1.HttpError.setHttpError(400, "Not found");
    }
    res.json(result);
};
exports.default = removeContact;
//# sourceMappingURL=removeContact.js.map