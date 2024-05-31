import { validationResult, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const validateId = [
  param('id').custom(id => {
    return isValidObjectId(id);
  }),

  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new Error('Invalid id'));
    }
    console.log('id validated');
    next();
  },
];
