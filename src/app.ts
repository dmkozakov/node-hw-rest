import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import contactsRouter from './routes/api/contacts';
import authRouter from './routes/api/auth';

import type { Express, Request, Response, NextFunction } from 'express';
import { IError } from './interfaces/IError';

const app: Express = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((_: Request, res: Response) => {
  res.status(404).json({ code: 404, message: 'Not found' });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
app.use((err: IError, _: Request, res: Response, __S: NextFunction) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ code: status, message });
});

export default app;
