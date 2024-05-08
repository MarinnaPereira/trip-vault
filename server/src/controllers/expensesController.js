import { decode } from 'html-entities';
import fse from 'fs-extra';

import Trip from '../models/Trip.js';

export const getAllExpenses = async (req, res, next) => {
  //! necessary? when we get the trip, we get all expenses
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
    const { categoryName, value, currency, description, dates, paymentMethod } =
      req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const receiptPath = req.file ? req.file.path : undefined;
    console.log(req.file);

    const newExpense = {
      categoryName,
      value,
      currency,
      description,
      dates,
      // dates: dates ? dates.split(',').map(date => new Date(date)) : [],
      paymentMethod,
      receipt: receiptPath,
    };

    trip.expenses.push(newExpense);
    await trip.save();
    res.status(201).json(newExpense);
  } catch (error) {
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
    return res.status(404).json({ message: 'Receiptnot found' });
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
    const expense = trip.expenses.filter(expense =>
      expense._id.equals(expenseId),
    )[0];
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    Object.assign(expense, req.body);

    // if client deleted receipt image
    if (!req.file) {
      const receiptPath = expense.receipt;
      const originalReceiptPath = decode(receiptPath);
      // console.log(originalReceiptPath);
      fse.remove(originalReceiptPath);
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
    // const expense = trip.expenses.filter(expense =>
    //   expense._id.equals(expenseId),
    // )[0];
    // if (!expense) {
    //   return res.status(404).json({ message: 'Expense not found' });
    // }
    trip.expenses = trip.expenses.filter(
      expense => !expense._id.equals(expenseId),
    );
    await trip.save();
    //! remember to delete the file of the uploads folder as well
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    next(error);
  }
};
