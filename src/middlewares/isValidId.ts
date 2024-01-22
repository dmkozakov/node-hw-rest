import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers';

import type { Request, Response, NextFunction } from 'express';

const isValidId = (req: Request, _: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw HttpError.set(400, `${id} isn\`t valid id`);
  }
  next();
};

export default isValidId;
