import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import Token from '../models/token';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

interface Payload {
  id: Types.ObjectId;
  email: string;
  verify: boolean;
}

class TokenService {
  generateToken(payload: Payload) {
    if (typeof JWT_ACCESS_SECRET === 'string' && typeof JWT_REFRESH_SECRET === 'string') {
      const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '10s' });
      const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });

      return {
        accessToken,
        refreshToken,
      };
    }
  }

  validateAccessToken(token: string) {
    if (typeof JWT_ACCESS_SECRET !== 'string') {
      return null;
    }

    const userData = jwt.verify(token, JWT_ACCESS_SECRET);
    return userData;
  }

  validateRefreshToken(token: string) {
    if (typeof JWT_REFRESH_SECRET !== 'string') {
      return null;
    }

    const userData = jwt.verify(token, JWT_REFRESH_SECRET);
    return userData;
  }

  async saveToken(id: Types.ObjectId, refreshToken: string) {
    const tokenData = await Token.findOne({ tokenData: id });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await Token.create({ user: id, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
