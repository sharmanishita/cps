// src/validators/conceptValidator.ts
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const conceptValidationRules = () => [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('contentBlocks').isArray({ min: 1 }).withMessage('At least one content block is required.'),
    body('contentBlocks.*.type', 'Content block type is required').not().isEmpty(),
    body('contentBlocks.*.data', 'Content block data is required').not().isEmpty(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: object[] = [];
    errors.array().map(err => extractedErrors.push({ [(err as any).path]: err.msg }));
    return res.status(422).json({ errors: extractedErrors });
};
