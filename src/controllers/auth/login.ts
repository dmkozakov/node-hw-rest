import bcrypt from 'bcrypt';
import { User } from '../../models';
import { HttpError } from '../../helpers/index';
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

  const result = await AuthService.login(user._id);
  const token = result?.token;

  if (!token) {
    throw HttpError.set(401);
  }

  res.status(200).json({
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

export default login;
