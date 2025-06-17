import { Request, Response, NextFunction } from 'express';

// This is the main error handling middleware.
export const errorHandler = (
    err: Error & { statusCode?: number },
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    console.error(`[ERROR] ${statusCode} - ${err.message}\n${err.stack}`);

    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};