import { HttpError } from '../../helpers/index';
import { ContactsService } from '../../services';

import type { Request, Response } from 'express';

const getContactById = async (req: Request, res: Response) => {
  const result = await ContactsService.getByTd(req);

  if (!result) {
    throw HttpError.set(400, 'Not found');
  }

  res.status(200).json({ code: 200, data: result });
};

export default getContactById;
