"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const helpers_1 = require("../../helpers");
const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await index_1.Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw helpers_1.HttpError.setHttpError(400, "Not found");
    }
    res.json(result);
};
exports.default = updateStatusContact;
//# sourceMappingURL=updateStatusContact.js.map