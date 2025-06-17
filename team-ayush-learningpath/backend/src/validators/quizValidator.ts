import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const submitQuizRules = () => [
    // Ensure 'answers' is an array and contains only numbers (the index of the chosen option).
    body('answers')
        .isArray({ min: 1 })
        .withMessage('The answers field must be an array with at least one answer.'),
    body('answers.*')
        .isNumeric()
        .withMessage('Each answer must be a numeric index.'),
];

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