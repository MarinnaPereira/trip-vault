import { body, validationResult } from 'express-validator';

export const validateExpense = [
  body('categoryName')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isIn([
      'Accommodation',
      'Activities',
      'Groceries',
      'Restaurants',
      'Services',
      'Shopping',
      'Taxes & Fees',
      'Transportation',
      'Others',
    ])
    .withMessage('Invalid category name'),

  body('value')
    .notEmpty()
    .withMessage('Expense value is required')
    .isNumeric()
    .withMessage(
      'Expense value must be a number (use "." as the decimal separator)',
    )
    .escape(),

  body('currency')
    .notEmpty()
    .withMessage('Currency is required')
    .isString()
    .withMessage('Currency must be a string')
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be 3 characters long'),

  body('convertedAmount')
    .optional()
    .isNumeric()
    .withMessage('Converted amount must be a number'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .escape(),

  body('dates')
    .isArray({ min: 1 })
    .withMessage('At least one date is required')
    .custom(value => value.every(date => !isNaN(Date.parse(date))))
    .withMessage('Dates must be valid date format'),

  body('paymentMethod')
    .optional()
    .isString()
    .withMessage('Payment method must be a string')
    .escape(),

  body('receipt')
    .optional()
    .isString()
    .withMessage('Receipt must be a string')
    .escape(),

  (req, res, next) => {
    console.log('req.body on validate', req.body);

    const errors = validationResult(req);
    console.log('errors', errors);
    if (errors.isEmpty()) {
      console.log('expense validated');
      return next();
    }
    next({ status: 400, message: errors.array()[0].msg });
  },
];
