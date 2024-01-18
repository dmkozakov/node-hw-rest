import { HttpError } from "../helpers";

import { Schema } from "joi";
import type { Request, Response, NextFunction } from "express"

const validateBody = (schema: Schema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError.setHttpError(400, error.message));
    }

    next();
  };

  return func;
};

export  default validateBody
