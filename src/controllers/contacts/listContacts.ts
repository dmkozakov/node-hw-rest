import { HttpError } from '../../helpers';
import { ContactsService } from '../services';

import type { Request, Response } from 'express';

const listContacts = async (req: Request, res: Response) => {
  const result = await ContactsService.getAll(req);

  if (!result) {
    throw HttpError.set(400, 'Unable to fetch contacts');
  }

  res.status(200).json({ code: 200, data: result });
};

export default listContacts;
