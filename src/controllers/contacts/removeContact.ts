import { HttpError } from '../../helpers/index';
import { ContactsService } from '../../services';

import type { Request, Response } from 'express';

const removeContact = async (req: Request, res: Response) => {
  const result = await ContactsService.remove(req);

  if (!result) {
    throw HttpError.set(400, 'Not found');
  }

  res.status(204).json({ code: 204, data: result });
};

export default removeContact;
