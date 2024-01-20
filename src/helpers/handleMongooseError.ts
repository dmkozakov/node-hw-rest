import { CallbackWithoutResultAndOptionalError, MongooseError } from 'mongoose';
import { HttpError } from './HttpError';

type Err = MongooseError & { code: number; status: number };

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const handleMongooseError = (err: Err, _: any, next: CallbackWithoutResultAndOptionalError) => {
  const { name, code } = err;

  if (err.name === 'MongoServerError' && (err as Err).code === 11000) {
    const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

    next(HttpError.set(status, err.message));
  } else {
    next();
  }
};
