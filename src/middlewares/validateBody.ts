import { HttpError } from '../helpers';

import type { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError.setHttpError(400, error.message));
    }

    next();
  };

  return func;
};
