"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../services");
const updateContact = async (req, res) => {
    const result = await services_1.ContactsService.update(req);
    if (!result) {
        throw helpers_1.HttpError.set(404, 'Not found');
    }
    res.status(201).json({ code: 201, data: result });
};
exports.default = updateContact;
//# sourceMappingURL=updateContact.js.map