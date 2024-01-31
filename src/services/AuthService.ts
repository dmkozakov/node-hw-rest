import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import crypto from 'node:crypto';

import { User } from '../models';
import { HttpError, sendEmail, verifyEmail } from '../helpers';

const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
const uploadDir = path.join(process.cwd(), 'tmp');

import type { Request } from 'express';
import { Types } from 'mongoose';
import { UserData, UserRequest } from '../interfaces/IUser';
import TokenService from './TokenService';
import { UserDto } from '../dtos';

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

    const userDto = new UserDto(newUser);
    const tokens = TokenService.generateToken({ ...userDto });

    if (!tokens) {
      return null;
    }

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    newUser.accessToken = tokens.accessToken;
    newUser.refreshToken = tokens.refreshToken;
    await newUser.save();

    const verificationEmail = verifyEmail(email, verificationToken);
    await sendEmail(verificationEmail);

    return newUser || null;
  }

  async login(id: Types.ObjectId) {
    const user = await User.findOne(id).exec();

    if (!user) {
      return null;
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });

    if (!tokens) {
      return null;
    }

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return user || null;
  }

  async logout(req: Request) {
    const { refreshToken } = req.cookies;
    await TokenService.removeToken(refreshToken);

    const { _id } = (req as UserRequest).user;
    const result = await User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null }, { new: true });

    return result || null;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw HttpError.set(401);
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw HttpError.set(401);
    }

    const user = await User.findById((userData as UserData).id);

    if (!user) {
      return null;
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });

    if (!tokens) {
      return null;
    }

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return user || null;
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
