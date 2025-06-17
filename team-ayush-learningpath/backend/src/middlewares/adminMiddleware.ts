// src/middlewares/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check if the authenticated user is an admin.
 * This should be used *after* the 'protect' middleware.
 * @param req - Express request object, expects req.user to be populated.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const admin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        // If user exists and has the 'admin' role, proceed to the next middleware/controller
        next();
    } else {
        // If not, send a 403 Forbidden error
        res.status(403).json({ message: 'Not authorized as an admin. Access denied.' });
    }
};
