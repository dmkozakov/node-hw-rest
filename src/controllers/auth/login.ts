import bcrypt from 'bcrypt';
import { User } from '../../models';
import { HttpError } from '../../helpers';
import { AuthService } from '../../services';

import type { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError.set(401, 'Email or password invalid');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw HttpError.set(401, 'Email or password invalid');
  }

  if (!user.verify) {
    throw HttpError.set(401, 'Please verify your email');
  }

  const result = await AuthService.login(user._id);

  const token = result?.accessToken;
  res.cookie('refreshToken', result?.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  if (!token) {
    throw HttpError.set(401);
  }

  res.status(200).json({
    code: 200,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    },
  });
};

export default login;
