import { Request } from 'express';
import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  subscription: 'starter' | 'pro' | 'business';
  token?: string;
  avatarURL?: string;
}

export type UserRequest = Request & { user: IUser };
export type AvatarRequest = Request & { file: { path: string; originalname: string } };
