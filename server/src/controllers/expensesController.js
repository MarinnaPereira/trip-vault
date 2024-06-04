import { decode } from 'html-entities';
import fse from 'fs-extra';

import Trip from '../models/Trip.js';

export const getAllExpenses = async (req, res, next) => {
  try {
    const tripId = req.tripId;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenses = trip.expenses;
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

export const addExpense = async (req, res, next) => {
  try {
    const tripId = req.tripId;
    const {
      categoryName,
      value,
      convertedAmount,
      currency,
      description,
      dates,
      paymentMethod,
    } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const newExpense = {
      categoryName,
      value,
      currency,
      convertedAmount,
      description,
      dates,
      paymentMethod,
      receipt: req.file ? req.file.path : undefined,
    };
    trip.expenses.push(newExpense);
    await trip.save();
    const savedExpense = trip.expenses[trip.expenses.length - 1];
    res.status(201).json(savedExpense);
  } catch (error) {
    if (req.file) {
      const receiptPath = expense.receipt;
      const originalReceiptPath = decode(receiptPath);
      fse.remove(originalReceiptPath);
      expense.receipt = undefined;
    }
    next(error);
  }
};

export const getExpense = async (req, res, next) => {
  try {
    const tripId = req.tripId;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenseId = req.params.id;
    const expense = trip.expenses.find(
      expense => expense._id.toString() === expenseId,
    );
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    const receiptPath = expense.receipt;
    const originalReceiptPath = decode(receiptPath);
    expense.receipt = originalReceiptPath;
    res.locals.expense = expense;
    if (req.path.includes('receipt')) {
      next();
    } else {
      res.json(expense);
    }
  } catch (error) {
    next(error);
  }
};

export const downloadReceipt = async (req, res, next) => {
  if (!res.locals.expense || !res.locals.expense.receipt) {
    return res.status(404).json({ message: 'Receipt not found' });
  }
  res.sendFile(res.locals.expense.receipt), { root: '.' };
};

export const updateExpense = async (req, res, next) => {
  try {
    const tripId = req.tripId;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenseId = req.params.id;
    const expenseIndex = trip.expenses.findIndex(expense =>
      expense._id.equals(expenseId),
    );
    if (expenseIndex === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    const {
      categoryName,
      value,
      convertedAmount,
      currency,
      description,
      dates,
      paymentMethod,
    } = req.body;
    const expense = trip.expenses[expenseIndex];
    if (categoryName !== undefined) expense.categoryName = categoryName;
    if (value !== undefined) expense.value = value;
    if (convertedAmount !== undefined)
      expense.convertedAmount = convertedAmount;
    if (currency !== undefined) expense.currency = currency;
    if (description !== undefined) expense.description = description;
    if (dates !== undefined) expense.dates = dates;
    if (paymentMethod !== undefined) expense.paymentMethod = paymentMethod;
    if (req.file) {
      expense.receipt = req.file.path;
    } else if (expense.receipt) {
      const receiptPath = expense.receipt;
      const originalReceiptPath = decode(receiptPath);
      await fse.remove(originalReceiptPath);
      expense.receipt = undefined;
    }
    await trip.save();
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const tripId = req.tripId;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenseId = req.params.id;
    const expense = trip.expenses.filter(expense =>
      expense._id.equals(expenseId),
    )[0];
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (expense.receipt) {
      const receiptPath = expense.receipt;
      const originalReceiptPath = decode(receiptPath);
      await fse.remove(originalReceiptPath);
      expense.receipt = undefined;
    }
    trip.expenses = trip.expenses.filter(
      expense => !expense._id.equals(expenseId),
    );
    await trip.save();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    next(error);
  }
};
