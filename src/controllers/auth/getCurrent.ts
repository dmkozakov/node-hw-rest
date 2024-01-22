import { CustomRequest } from '../../interfaces/IUser';
import type { Request, Response } from 'express';

const getCurrent = async (req: Request, res: Response) => {
  const { email, subscription } = (req as CustomRequest).user;

  res.status(200).json({
    code: 200,
    data: { email, subscription },
  });
};

export default getCurrent;
