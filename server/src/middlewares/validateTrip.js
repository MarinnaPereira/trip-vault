import { body, validationResult } from 'express-validator';

export const validateTrip = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Trip name is required')
    .isLength({ min: 2 })
    .withMessage('Trip name must be at least 2 characters long')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Trip name should only contain letters, numbers, and spaces')
    .escape(),

  body('currency')
    .notEmpty()
    .withMessage('Currency is required')
    .isString()
    .withMessage('Currency must be a string')
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be 3 characters long'),

  body('budget').isNumeric().withMessage('Budget must be a number').optional(),

  body('start')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date format'),

  body('end')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date format'),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      console.log('trip validated');
      return next();
    }
    next({ status: 400, message: errors.array()[0].msg });
  },
];
