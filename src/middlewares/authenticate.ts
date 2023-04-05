import { NextFunction, Response, Request } from 'express';
import { handleError } from './handleError';
import { pareJwtToken } from '../utils/jwt';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(' ')[1];

  if (token) {
    const auth: any = pareJwtToken(token);
    if (auth && auth.id) {
      req.authId = auth.id;
      next();
    } else return handleError(res, 400, 'Invalid token');
  } else {
    return res.status(400).json({ errors: { global: 'No token' } });
  }
};
