"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../helpers/index");
const services_1 = require("../../services");
const removeContact = async (req, res) => {
    const result = await services_1.ContactsService.remove(req);
    if (!result) {
        throw index_1.HttpError.set(400, 'Not found');
    }
    res.status(204).json({ code: 204, data: result });
};
exports.default = removeContact;
//# sourceMappingURL=removeContact.js.map