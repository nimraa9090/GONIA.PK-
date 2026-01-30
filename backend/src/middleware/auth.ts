import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, (process.env.JWT_SECRET as string) || 'secret') as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function generateToken(payload: any) {
  return jwt.sign(payload, (process.env.JWT_SECRET as string) || 'secret', {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
}
