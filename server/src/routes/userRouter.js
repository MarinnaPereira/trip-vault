import { Router } from 'express';

import { validateId } from '../middlewares/validateId.js';
import verifyToken from '../middlewares/verifyToken.js';
import { sanitizeUserToUpdate } from '../middlewares/sanitizeUserToUpdate.js';
import { validateUser } from '../middlewares/validateUser.js';
import {
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

export const userRouter = Router();

userRouter
  .route('/:id')
  .get(validateId, verifyToken, getUser)
  .patch(
    validateId,
    verifyToken,
    sanitizeUserToUpdate,
    validateUser,
    updateUser,
  )
  .delete(validateId, verifyToken, deleteUser);
