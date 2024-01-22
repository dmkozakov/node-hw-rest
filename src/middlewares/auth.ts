import jwt from 'jsonwebtoken';
import { User } from '../models';
import { HttpError } from '../helpers';

const { JWT_SECRET } = process.env;

import type { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/IUser';

interface JWT {
  id: string;
}

const auth = async (req: Request, _: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' && token) {
    next(HttpError.set(401));
  }

  try {
    if (typeof JWT_SECRET === 'string') {
      const { id } = jwt.verify(token, JWT_SECRET) as JWT;
      const user = await User.findById(id).exec();

      if (user) {
        if (!user.token || user.token !== token) {
          next(HttpError.set(401));
        }

        (req as CustomRequest).user = user;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
