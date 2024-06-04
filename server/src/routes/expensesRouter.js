import { Router } from 'express';
import multer from 'multer';

import { validateId } from '../middlewares/validateId.js';
import verifyToken from '../middlewares/verifyToken.js';
import { validateExpense } from '../middlewares/validateExpense.js';
import {
  getAllExpenses,
  addExpense,
  getExpense,
  downloadReceipt,
  updateExpense,
  deleteExpense,
} from '../controllers/expensesController.js';

export const expensesRouter = Router();

const upload = multer({ dest: 'uploads/' });

expensesRouter
  .route('/')
  .get(verifyToken, getAllExpenses)
  .post(verifyToken, upload.single('file'), validateExpense, addExpense);

expensesRouter
  .route('/:id')
  .get(verifyToken, validateId, getExpense)
  .patch(
    verifyToken,
    validateId,
    upload.single('file'),
    validateExpense,
    updateExpense,
  )
  .delete(verifyToken, validateId, deleteExpense);

expensesRouter
  .route('/:id/receipt')
  .get(verifyToken, validateId, getExpense, downloadReceipt);
