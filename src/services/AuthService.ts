import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import crypto from 'node:crypto';

import { User } from '../models';
import { sendEmail, verifyEmail } from '../helpers';

const { JWT_SECRET } = process.env;
const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
const uploadDir = path.join(process.cwd(), 'tmp');

import type { Request } from 'express';
import { Types } from 'mongoose';
import { UserRequest } from '../interfaces/IUser';

type FileRequest = Request & { file: { path: string; originalname: string } };

class AuthService {
  async register(req: Request) {
    const { email, password, subscription } = req.body;
    const avatarURL = gravatar.url(email);

    const verificationToken = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const verificationEmail = verifyEmail(email, verificationToken);

    await sendEmail(verificationEmail);

    return newUser || null;
  }

  async login(id: Types.ObjectId) {
    if (typeof JWT_SECRET !== 'string') {
      return null;
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
    const { path: tmpUpload, originalname } = (req as FileRequest).file;
    const avatarPath = path.join(uploadDir, originalname);
    const resizedUpload = `${uploadDir}/resized.jpg`;

    const image = await Jimp.read(avatarPath);
    await image.resize(250, 250).writeAsync(resizedUpload);

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(resizedUpload, resultUpload);
    await fs.unlink(tmpUpload);

    const avatarURL = path.join('avatars', filename);
    const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true }).exec();

    return result || null;
  }
}

export default new AuthService();
