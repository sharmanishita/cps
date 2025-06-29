import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const conceptValidationRules = () => [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('contentBlocks').optional().isArray().withMessage('Content blocks must be an array.'),
    body('quiz').optional().isArray().withMessage('Quiz must be an array.'),
];

// We can reuse the same 'validate' function from the authValidator,
// or keep it separate for clarity. Here we define it again for modularity.
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