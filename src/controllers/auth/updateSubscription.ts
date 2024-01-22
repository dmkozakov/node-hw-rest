import { HttpError } from '../../helpers';
import AuthService from '../services/AuthService';

import type { Request, Response } from 'express';

const updateSubscription = async (req: Request, res: Response) => {
  const result = await AuthService.updateSubscription(req);

  if (!result) {
    throw HttpError.set(404);
  }

  res.status(201).json({ code: 201, data: result });
};
export default updateSubscription;
