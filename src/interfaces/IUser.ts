import type { Request } from 'express';
import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  subscription: 'starter' | 'pro' | 'business';
  password?: string;
  token?: string;
}

export type CustomRequest = Request & {
  user: IUser;
};
