import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { config } from './config/config';
export interface UserPayload {
  email: string;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  // fetching cookie
  const decoded = req.headers['authorization'];

  if (!decoded) {
    return res.status(403).json({
      success: false,
      data: 'Not Authorised',
    });
  }
  try {
    const limbo = decoded.split(' ');
    const token = limbo[1];
    const payload = jwt.verify(token, config.JWT_SECRET) as UserPayload;
    //fetch user

    const user = payload;
    req.user = user;
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        data: err.message,
      });
    }

    return res.status(400).json({
      success: false,
      data: 'Something went wrong',
    });
  }
  next();
}

export { isLoggedIn };
