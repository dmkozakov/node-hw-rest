import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models';

import type { Request } from 'express';
import { CustomRequest } from '../../interfaces/IUser';
import { Types } from 'mongoose';

const { JWT_SECRET } = process.env;

class AuthService {
  async register(req: Request) {
    const { email, password, subscription } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, subscription });

    return newUser || null;
  }

  async login(id: Types.ObjectId) {
    const payload = { id };

    if (typeof JWT_SECRET === 'string') {
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
      const result = await User.findByIdAndUpdate(id, { token }, { new: true }).exec();

      return result || null;
    }

    return null;
  }

  async logout(req: Request) {
    const { _id } = (req as CustomRequest).user;
    const result = await User.findByIdAndUpdate(_id, { token: null }, { new: true });
    return result || null;
  }

  async updateSubscription(req: Request) {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    return result || null;
  }
}

export default new AuthService();
