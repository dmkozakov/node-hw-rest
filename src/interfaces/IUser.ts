import { Request } from 'express';
import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  subscription: 'starter' | 'pro' | 'business';
  token: string | null;
  avatarURL: string | null;
  verify: boolean;
  verificationToken: string;
}

export type UserRequest = Request & {
  user: IUser;
};
