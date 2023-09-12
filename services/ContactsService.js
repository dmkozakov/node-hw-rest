const { Contact } = require("../models");

class ContactsService {
  async getAll(req) {
    const { _id: owner } = req.user;

    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    const query = Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    });

    if (favorite) {
      const result = await query.all("favorite", favorite).exec();

      return result || null;
    }

    const result = await query.exec();
    return result || null;
  }

  async add(req) {
    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });

    return result || null;
  }

  async getByTd(req) {
    const { id } = req.params;
    const result = await Contact.findById(id);

    return result || null;
  }

  async update(req) {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    return result || null;
  }

  async updateStatus(req) {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    return result || null;
  }

  async remove(req) {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    return result || null;
  }
}

module.exports = new ContactsService();
