import { IError } from './interfaces/iError';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import contactsRouter from './routes/api/contacts';
import authRouter from './routes/api/auth';

import type { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((_: Request, res: Response) => {
  return res.status(404).json({ code: 404, message: 'Not found' });
});

app.use((err: IError, _: Request, res: Response, __S: NextFunction) => {
  const { status = 500, message = 'Server error' } = err;
  return res.status(status).json({ code: status, message });
});

export default app;
