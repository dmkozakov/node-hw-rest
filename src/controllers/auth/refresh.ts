import { AuthService } from '../../services';

import type { Request, Response } from 'express';
import { HttpError } from '../../helpers';

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const userData = await AuthService.refresh(refreshToken);
  if (!userData) {
    throw HttpError.set(404);
  }

  res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  res.status(200).json({
    code: 200,
    data: userData,
  });
};

export default refresh;
