// src/utils/errorHandler.ts

/**
 * A simple utility class for creating custom error objects
 * that can be easily handled by our middleware.
 */
export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
