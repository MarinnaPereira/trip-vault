import { Router } from 'express';

import {
  getAllExpenses,
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expensesController.js';
import { validateExpense } from '../middlewares/validateExpense.js';
import { validateId } from '../middlewares/validateId.js';

export const expensesRouter = Router();

expensesRouter.route('/').get(getAllExpenses).post(validateExpense, addExpense);

expensesRouter
  .route('/:id')
  .get(validateId, getExpense)
  .patch(validateId, updateExpense)
  .delete(validateId, deleteExpense);
