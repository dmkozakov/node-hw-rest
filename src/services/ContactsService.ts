import { Contact } from '../models';

import type { Request } from 'express';
import { UserRequest } from '../interfaces/IUser';

class ContactsService {
  async getAll(req: Request) {
    const { _id: owner } = (req as UserRequest).user;

    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = Contact.find({ owner }, '-createdAt -updatedAt', {
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

  async add(req: Request) {
    const { _id: owner } = (req as UserRequest).user;

    const result = await Contact.create({ ...req.body, owner });

    return result || null;
  }

  async getByTd(req: Request) {
    const { id } = req.params;
    const result = await Contact.findById(id);

    return result || null;
  }

  async update(req: Request) {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    return result || null;
  }

  async updateStatus(req: Request) {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    return result || null;
  }

  async remove(req: Request) {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    return result || null;
  }
}

export default new ContactsService();
