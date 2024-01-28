import { HttpError } from '../../helpers';
import { User } from '../../models/index';
import { EmailService } from '../../services';

import type { Request, Response } from 'express';

const verify = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(token)

  const user = await User.findOne({ verificationToken: token }).exec();

  if (!user) {
    throw HttpError.set(404, 'User not found');
  }

  const result = await EmailService.verify(user._id);

  if (!result) {
    throw HttpError.set(400, 'Unable to verify email');
  }

  res.status(200).json({
    code: 200,
    message: 'Verification successful',
  });
};

export default verify;
