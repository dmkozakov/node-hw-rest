import { CallbackWithoutResultAndOptionalError, MongooseError } from 'mongoose';
import HttpError from './HttpError';

type Err = MongooseError & { code: number };

const handleMongooseError = (err: MongooseError, _: any, next: CallbackWithoutResultAndOptionalError) => {
  if (err.name === 'MongoServerError' && (err as Err).code === 11000) {
    const status = err.name === 'MongoServerError' && (err as Err).code === 11000 ? 409 : 400;

    next(HttpError.set(status, err.message));
  } else {
    next();
  }
};

export default handleMongooseError;
