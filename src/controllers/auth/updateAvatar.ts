import { HttpError } from '../../helpers';
import { AuthService } from '../../services';

import type { Request, Response } from 'express';

const updateAvatar = async (req: Request, res: Response) => {
  if (!req.file) {
    throw HttpError.set(400, 'Missing avatar file');
  }

  const result = await AuthService.updateAvatar(req);
  const avatarURL = result?.avatarURL;

  if (!result) {
    throw HttpError.set(401, 'Unable to update avatar, try again later');
  }

  res.status(200).json({ code: 200, data: { avatarURL } });
};

export default updateAvatar;
