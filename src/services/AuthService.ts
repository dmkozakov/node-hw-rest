import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Jimp from 'jimp';

import { User } from '../models';

import type { Request } from 'express';
import { Types } from 'mongoose';
import { AvatarRequest, UserRequest } from '../interfaces/IUser';

const { JWT_SECRET } = process.env;
const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
const uploadDir = path.join(process.cwd(), 'tmp');

class AuthService {
  async register(req: Request) {
    const { email, password, subscription } = req.body;
    const avatarURL = gravatar.url(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, subscription, avatarURL });

    return newUser || null;
  }

  async login(id: Types.ObjectId) {
    if (typeof JWT_SECRET !== 'string') {
      return;
    }

    const payload = { id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
    const result = await User.findByIdAndUpdate(id, { token }, { new: true }).exec();

    return result || null;
  }

  async logout(req: Request) {
    const { _id } = (req as UserRequest).user;
    const result = await User.findByIdAndUpdate(_id, { token: null }, { new: true });
    return result || null;
  }

  async updateSubscription(req: Request) {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    return result || null;
  }

  async updateAvatar(req: Request) {
    const { _id } = (req as UserRequest).user;
    const { path: tmpUpload, originalname } = (req as AvatarRequest).file;
    const avatarPath = path.join(uploadDir, originalname);
    const resizedUpload = `${uploadDir}/resized.jpg`;

    const image = await Jimp.read(avatarPath);
    await image.resize(250, 250).writeAsync(resizedUpload);

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(resizedUpload, resultUpload);
    await fs.unlink(tmpUpload);

    const avatarURL = path.join('avatars', filename);
    const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    return result || null;
  }
}

export default new AuthService();
