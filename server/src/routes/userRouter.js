import { Router } from 'express';

import {
  getUser,
  updateUser,
  deleteUser,
  getAvailableCurrencies,
  convertCurrencyAmount,
} from '../controllers/userController.js';
import { validateId } from '../middlewares/validateId.js';
import { validateUser } from '../middlewares/validateUser.js';

export const userRouter = Router();

// * Currency endpoints
userRouter.get('/currencies', getAvailableCurrencies);
userRouter.post('/convert-currency', convertCurrencyAmount);

userRouter
  .route('/:id')
  .get(validateId, getUser)
  .patch(validateId, validateUser, updateUser)
  .delete(validateId, deleteUser);
