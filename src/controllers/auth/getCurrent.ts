import type { Request, Response } from 'express';
import { UserRequest } from '../../interfaces/IUser';

const getCurrent = async (req: Request, res: Response) => {
  const { email, subscription } = (req as UserRequest).user;

  res.status(200).json({
    code: 200,
    data: { email, subscription },
  });
};

export default getCurrent;
