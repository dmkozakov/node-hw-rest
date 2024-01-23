import { HttpError } from '../../helpers/index';
import { ContactsService } from '../../services';

import type { Request, Response } from 'express';

const updateContact = async (req: Request, res: Response) => {
  const result = await ContactsService.update(req);

  if (!result) {
    throw HttpError.set(404, 'Not found');
  }

  res.status(201).json({ code: 201, data: result });
};

export default updateContact;
