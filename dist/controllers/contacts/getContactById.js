"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../helpers/index");
const services_1 = require("../../services");
const getContactById = async (req, res) => {
    const result = await services_1.ContactsService.getByTd(req);
    if (!result) {
        throw index_1.HttpError.set(400, 'Not found');
    }
    res.status(200).json({ code: 200, data: result });
};
exports.default = getContactById;
//# sourceMappingURL=getContactById.js.map