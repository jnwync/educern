import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
  user?: number;
}

interface TokenPayload extends JwtPayload {
  user: number;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Access denied, token missing!' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const payload = jwt.verify(token, secret) as TokenPayload;
    if (!payload || !payload.user) {
      throw new Error('Invalid token payload');
    }

    req.user = payload.user;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token!' });
  }
};

