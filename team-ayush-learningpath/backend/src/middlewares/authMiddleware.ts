import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

/**
 * Verifies the JWT token from the cookie to protect routes.
 * If the token is valid, it attaches the user's data to the request object.
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies && req.cookies.token) {
        try {
            // Get token from cookie
            token = req.cookies.token;

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

            // Get user from the token's ID and attach to the request object
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next(); // Proceed to the next middleware or controller
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};