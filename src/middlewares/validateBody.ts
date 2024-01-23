import { Schema } from 'joi';
import { HttpError } from '../helpers/index';

import type { Request, Response, NextFunction } from 'express';

const validateBody = (schema: Schema) => {
  const func = (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError.set(400, error.message));
    }

    next();
  };

  return func;
};

export default validateBody;
