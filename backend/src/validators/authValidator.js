const { body, validationResult } = require('express-validator');

/**
 * An array of validation rules for the user login request.
 */
const loginValidationRules = () => {
    return [
        body('email', 'Please provide a valid email address.').isEmail(),
        body('password', 'Password is required.').not().isEmpty(),
    ];
};

/**
 * A middleware that checks for validation errors from express-validator.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    loginValidationRules,
    validate,
};