import { HttpError } from '../../helpers';
import { ContactsService } from '../../services';

import type { Request, Response } from 'express';

const addContact = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw HttpError.set(400, 'Missing required fields');
  }

  const result = await ContactsService.add(req);

  if (!result) {
    throw HttpError.set(400, 'Unable to add contact');
  }

  res.status(201).json({ code: 201, data: result });
};

export default addContact;
