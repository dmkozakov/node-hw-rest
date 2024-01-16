import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import type { Express, NextFunction, Request, Response } from 'express';
import { IError } from './interfaces/IError';

import contactsRouter from './routes/api/contacts';

const app: Express = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
app.use((err: IError, req: Request, res: Response, _next: NextFunction) => {
  const { status = 500, message = 'Server error' } = err;

  return res.status(status).json({ message });
});

export default app;
