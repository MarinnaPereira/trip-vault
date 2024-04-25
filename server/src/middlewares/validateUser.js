import { body, validationResult } from "express-validator";

export const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 2 })
    .withMessage("Username must be at least 2 characters long")
    .isAlphanumeric()
    .withMessage("Username should only contain letters and numbers")
    .escape(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail({ all_lowercase: true })
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      return next();
    }
    next({ status: 400, message: errors.array() });
  },
];
