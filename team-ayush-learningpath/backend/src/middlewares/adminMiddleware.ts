import { Request, Response, NextFunction } from 'express';

/**
 * Checks if the authenticated user has an 'admin' role.
 * This middleware must run after the 'protect' middleware.
 */
export const admin = (req: Request, res: Response, next: NextFunction) => {
    // req.user is populated by the preceding 'protect' middleware
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed
    } else {
        res.status(403).json({ message: 'Forbidden. Admin access required.' });
    }
};