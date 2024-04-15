import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function validateMiddleware(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  console.log(!errors.isEmpty());
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}
