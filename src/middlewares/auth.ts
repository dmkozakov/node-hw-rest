import { UserData, UserRequest } from './../interfaces/IUser';
// import jwt from 'jsonwebtoken';

import { User } from '../models/index';
import { HttpError } from '../helpers/index';
import { TokenService } from '../services';

// const { JWT_ACCESS_SECRET } = process.env;

import type { Request, Response, NextFunction } from 'express';

// interface JWT {
//   id: string;
// }

const auth = async (req: Request, _: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' && token) {
    next(HttpError.set(401));
  }

  try {
    // if (typeof JWT_ACCESS_SECRET === 'string') {
    // const { id } = jwt.verify(token, JWT_ACCESS_SECRET) as JWT;
    const userData = TokenService.validateAccessToken(token);
    const user = await User.findById((userData as UserData).id).exec();

    if (user) {
      if (!user.accessToken || user.accessToken !== token) {
        next(HttpError.set(401));
      }

      (req as UserRequest).user = user;
      // }

      next();
    }
  } catch (error) {
    next(error);
  }
};

export default auth;
