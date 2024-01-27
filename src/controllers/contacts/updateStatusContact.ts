import { HttpError } from '../../helpers';
import { ContactsService } from '../../services';

import type { Request, Response } from 'express';

const updateStatusContact = async (req: Request, res: Response) => {
  const { favorite } = req.body;
  if (!favorite) {
    throw HttpError.set(400, 'Missing field favorite');
  }

  const result = await ContactsService.updateStatus(req);

  if (!result) {
    throw HttpError.set(400, 'Not found');
  }

  res.status(201).json({ code: 201, data: result });
};

export default updateStatusContact;
