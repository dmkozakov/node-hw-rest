import express from "express";
import logger from "morgan";
import cors from "cors";
import 'dotenv/config'

import type {Express, Request, Response, NextFunction} from "express";

import contactsRouter from "./routes/api/contacts";
import { IError } from "./interfaces/IError";

const app: Express = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
app.use((err: IError, _: Request, res: Response, __S: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  return res.status(status).json({ message });
});

export default app;
