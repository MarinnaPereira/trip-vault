import Trip from '../models/Trip.js';

export const getAllExpenses = async (req, res, next) => {
  try {
    const { tripId } = req.body;
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
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const newExpense = req.body.expense;
    trip.expenses.push(newExpense);
    await trip.save();
    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
};

export const getExpense = async (req, res, next) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenseId = req.params.id;
    const expense = trip.expenses._id(expenseId);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenseId = req.params.id;
    const expenseToUpdate = trip.expenses._id(expenseId); //!
    if (!expenseToUpdate) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    Object.assign(expenseToUpdate, req.body.expense);
    await trip.save();
    res.json(expenseToUpdate);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenseId = req.params.id;
    const expenseToDelete = trip.expenses._id(expenseId);
    if (!expenseToDelete) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expenseToDelete.remove();
    await trip.save();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    next(error);
  }
};
