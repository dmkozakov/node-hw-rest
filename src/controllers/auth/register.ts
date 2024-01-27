import { User } from '../../models';
import { HttpError } from '../../helpers';
import { AuthService } from '../../services';

import type { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw HttpError.set(400, 'Missing required fields');
  }

  const user = await User.findOne({ email }).exec();
  if (user) {
    throw HttpError.set(409, 'Email already in use');
  }

  const newUser = await AuthService.register(req);
  if (!newUser) {
    throw HttpError.set(400, 'Unable to register, try again later');
  }

  res.status(201).json({
    code: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    },
  });
};

export default register;
