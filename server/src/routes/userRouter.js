import { Router } from 'express';

import {
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { validateId } from '../middlewares/validateId.js';
import { validateUser } from '../middlewares/validateUser.js';

export const userRouter = Router();

userRouter
  .route('/:id')
  .get(validateId, getUser)
  .patch(validateId, validateUser, updateUser)
  .delete(validateId, deleteUser);
