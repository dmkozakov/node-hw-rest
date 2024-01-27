import { CallbackWithoutResultAndOptionalError, MongooseError } from 'mongoose';
import HttpError from './HttpError';

type Err = MongooseError & { code: number };

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleMongooseError = (err: MongooseError, _: any, next: CallbackWithoutResultAndOptionalError) => {
  if (err.name === 'MongoServerError') {
    const status = (err as Err).code === 11000 ? 409 : 400;

    next(HttpError.set(status, err.message));
  }
  next();
};

export default handleMongooseError;
