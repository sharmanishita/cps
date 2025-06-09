import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = 1;
export interface JWTPayload extends Request {
  id: string;
  username: string;
}

export function jwtMiddleware(req: JWTPayload, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' })
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Authorization header missing' })
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
}
export function tokenGeneration(payload: Object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}
