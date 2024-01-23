"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../helpers/index");
const services_1 = require("../../services");
const addContact = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        throw index_1.HttpError.set(400, 'Missing required fields');
    }
    const result = await services_1.ContactsService.add(req);
    if (!result) {
        throw index_1.HttpError.set(400, 'Unable to add contact');
    }
    res.status(201).json({ code: 201, data: result });
};
exports.default = addContact;
//# sourceMappingURL=addContact.js.map