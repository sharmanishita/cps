// src/validators/authValidator.ts
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


// --- NEW VALIDATION RULES ---
export const forgotPasswordRules = () => [
    body('email', 'Please provide a valid email.').isEmail(),
];

export const resetPasswordRules = () => [
    body('password', 'Password must be at least 6 characters long.').isLength({ min: 6 }),
];

// The registration rules now validate 'firstName' and 'lastName' separately.
export const registerRules = () => [
    body('firstName', 'First name is required.').not().isEmpty(),
    body('lastName', 'Last name is required.').not().isEmpty(),
    body('email', 'Please include a valid email.').isEmail(),
    body('password', 'Password must be 6 or more characters.').isLength({ min: 6 }),
];

// Login rules remain the same
export const loginRules = () => [
    body('email', 'Please include a valid email.').isEmail(),
    body('password', 'Password is required.').exists(),
];

// Change password rules remain the same
export const changePasswordRules = () => [
    body('oldPassword', 'Old password is required.').not().isEmpty(),
    body('newPassword', 'New password must be at least 6 characters.').isLength({ min: 6 }),
];

// The validate function remains the same
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: object[] = [];
    errors.array().map(err => extractedErrors.push({ [(err as any).path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};
