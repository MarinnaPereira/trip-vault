import { body, validationResult } from 'express-validator';

import User from '../models/User.js';

export const validateUser = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters long')
    .isAlphanumeric()
    .withMessage('Username should only contain letters and numbers')
    .escape()
    .custom(async (value, req) => {
      const user = await User.findOne({ username: value });
      if (user && req.method === 'POST') {
        throw new Error('Username already in use');
      }
    }),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail({ all_lowercase: true, gmail_remove_dots: false })
    .escape()
    .custom(async (value, req) => {
      const user = await User.findOne({ email: value });
      if (user && req.method === 'POST') {
        throw new Error('Email already in use');
      }
    }),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    )
    .escape(),

  body('avatar')
    .trim()
    .notEmpty()
    .withMessage('Avatar is required')
    .isLength({ min: 2 })
    .withMessage('Avatar must be at least 2 characters long')
    .isAlphanumeric()
    .withMessage('Avatar should only contain letters and numbers')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      console.log('user validated');
      return next();
    }
    next({ status: 400, message: errors.array()[0].msg });
  },
];
