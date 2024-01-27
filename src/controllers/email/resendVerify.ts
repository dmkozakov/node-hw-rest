import { HttpError, verifyEmail, sendEmail } from '../../helpers';
import { User } from '../../models';

import type { Request, Response } from 'express';

const resendVerify = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError.set(400, 'Missing required field email');
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError.set(404, 'Email not found');
  }

  if (user.verify) {
    throw HttpError.set(400, 'Verification has already been passed');
  }

  const verificationEmail = verifyEmail(email, user.verificationToken);

  await sendEmail(verificationEmail);

  res.status(200).json({
    code: 200,
    message: 'Verification email sent',
  });
};

export default resendVerify;
