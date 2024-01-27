"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const updateStatusContact = async (req, res) => {
    const { favorite } = req.body;
    if (!favorite) {
        throw helpers_1.HttpError.set(400, 'Missing field favorite');
    }
    const result = await services_1.ContactsService.updateStatus(req);
    if (!result) {
        throw helpers_1.HttpError.set(400, 'Not found');
    }
    res.status(201).json({ code: 201, data: result });
};
exports.default = updateStatusContact;
//# sourceMappingURL=updateStatusContact.js.map