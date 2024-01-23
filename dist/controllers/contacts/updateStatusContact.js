"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../helpers/index");
const services_1 = require("../../services");
const updateStatusContact = async (req, res) => {
    const { favorite } = req.body;
    if (!favorite) {
        throw index_1.HttpError.set(400, 'Missing field favorite');
    }
    const result = await services_1.ContactsService.updateStatus(req);
    if (!result) {
        throw index_1.HttpError.set(400, 'Not found');
    }
    res.status(201).json({ code: 201, data: result });
};
exports.default = updateStatusContact;
//# sourceMappingURL=updateStatusContact.js.map