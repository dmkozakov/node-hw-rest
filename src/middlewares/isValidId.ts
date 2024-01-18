import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers";

import type { Request, Response, NextFunction } from "express"


const isValidId = (req: Request, _: Response, next: NextFunction) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError.setHttpError(400, `${contactId} isn\`t valid id`));
  }
  next();
};

export default isValidId;
