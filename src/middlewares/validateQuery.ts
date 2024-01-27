import { Schema } from 'joi';
import { HttpError } from '../helpers';

import type { Request, Response, NextFunction } from 'express';

const validateQuery = (schema: Schema) => {
  const func = (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    if (error) {
      next(HttpError.set(400, error.message));
    }
    next();
  };

  return func;
};

export default validateQuery;
