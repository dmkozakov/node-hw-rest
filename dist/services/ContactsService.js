"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class ContactsService {
    async getAll(req) {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10, favorite } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const query = models_1.Contact.find({ owner }, '-createdAt -updatedAt', {
            skip,
            limit: Number(limit),
        });
        if (favorite) {
            const result = await query.all('favorite', [favorite]).exec();
            return result || null;
        }
        const result = await query.exec();
        return result || null;
    }
    async add(req) {
        const { _id: owner } = req.user;
        const result = await models_1.Contact.create({ ...req.body, owner });
        return result || null;
    }
    async getByTd(req) {
        const { id } = req.params;
        const result = await models_1.Contact.findById(id);
        return result || null;
    }
    async update(req) {
        const { id } = req.params;
        const result = await models_1.Contact.findByIdAndUpdate(id, req.body, { new: true });
        return result || null;
    }
    async updateStatus(req) {
        const { id } = req.params;
        const result = await models_1.Contact.findByIdAndUpdate(id, req.body, { new: true });
        return result || null;
    }
    async remove(req) {
        const { id } = req.params;
        const result = await models_1.Contact.findByIdAndRemove(id);
        return result || null;
    }
}
exports.default = new ContactsService();
//# sourceMappingURL=ContactsService.js.map