import { Router } from 'express';
import upload from '../middlewares/uploadFile.js';

import {
  getAllExpenses,
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expensesController.js';
import { validateExpense } from '../middlewares/validateExpense.js';
import { validateId } from '../middlewares/validateId.js';
import verifyToken from '../middlewares/verifyToken.js';

export const expensesRouter = Router();

expensesRouter
  .route('/')
  .get(verifyToken, getAllExpenses)
  .post(verifyToken, upload.single('receipt'), validateExpense, addExpense);

expensesRouter
  .route('/:id')
  .get(verifyToken, validateId, getExpense)
  .patch(verifyToken, validateId, updateExpense)
  .delete(verifyToken, validateId, deleteExpense);
