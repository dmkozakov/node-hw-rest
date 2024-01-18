import { HttpError } from "./HttpError";
import { CallbackWithoutResultAndOptionalError, MongooseError  } from "mongoose";

type Err = MongooseError & { code: number}

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleMongooseError = (err: MongooseError, _: any ,next: CallbackWithoutResultAndOptionalError) => {
  if (err.name === 'MongoServerError' && (err as Err).code === 11000) {
  next(HttpError.setHttpError(400, err.message))
} else {
  next();
}
};

export default handleMongooseError;

