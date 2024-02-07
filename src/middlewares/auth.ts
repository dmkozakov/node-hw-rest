import { UserData, UserRequest } from './../interfaces/IUser';

import { User } from '../models/index';
import { HttpError } from '../helpers/index';
import { TokenService } from '../services';

import type { Request, Response, NextFunction } from 'express';

const auth = async (req: Request, _: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' && token) {
    next(HttpError.set(401));
  }

  try {
    const userData = TokenService.validateAccessToken(token);

    if (!userData) {
      next(HttpError.set(401));
    }

    const user = await User.findById((userData as UserData).id).exec();

    if (user) {
      if (!user.accessToken || user.accessToken !== token) {
        next(HttpError.set(401));
      }

      (req as UserRequest).user = user;

      next();
    }
  } catch (error) {
    next(HttpError.set(401));
  }
};

export default auth;
