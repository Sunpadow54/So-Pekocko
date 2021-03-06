// middleware validate input Email + password ...

// ------------------------- IMPORTS -------------------------

const { check, validationResult } = require('express-validator'); // package


// ============================================================
// ---------------------- Middlewares -------------------------


// Check if password & email inputs are correct
const userSignUpRules = () => {
    return [
        // Email input is filled /&/ is an email format ?
        check('email')
            .trim()
            .notEmpty().withMessage('this field is empty')
            .isEmail().withMessage('this email is not valid'),
        // Password input is filled /&/ minimum 5 chars /&/ correspond to regex ?
        check('password')
            .trim()
            .notEmpty().withMessage('this field is empty')
            .isLength({ min: 5 })
            .withMessage('password must be at least 5 chars long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)
            .withMessage('password must contain at least one digit, and one uppercase letter'),
    ]
}


// Handle errors messages ( next() is called if all is ok)
const validateSignUp = (req, res, next) => {
    const checkErrors = validationResult(req);

    // password or email is not good
    if (!checkErrors.isEmpty()) {
        // create an array of error messages
        const errors = checkErrors.array().map(error => {
            return { [error.param + 'Error']: error.msg }
        });

        return res.status(418).json({ errors })
    }
    // inputs are correct
    next();
}


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { userSignUpRules, validateSignUp }
