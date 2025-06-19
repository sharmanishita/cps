import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from './jwt.js';


interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export function requireRole(requiredRole: 'user' | 'admin') {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    if (req.user.role !== requiredRole && requiredRole === 'admin') {
      res.status(403).json({ message: 'Admin access required' });
      return;
    }
    next();
  }
}


export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }
  next();
}
