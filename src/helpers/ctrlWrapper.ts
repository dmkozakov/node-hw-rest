import type { Request, Response, NextFunction } from 'express';

type Controller = (req: Request, res: Response, next: NextFunction) => void;

export const ctrlWrapper = (ctrl: Controller) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
