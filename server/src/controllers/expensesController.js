import Trip from '../models/Trip.js';

export const getAllExpenses = async (req, res, next) => {
  //! necessary? when we get the trip, we get all expenses
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
    // const { tripId } = req.body; //! are we sending here or taking from the userId sent by the token?
    const {
      tripId,
      categoryName,
      value,
      currency,
      description,
      dates,
      paymentMethod,
    } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const receiptPath = req.file ? req.file.path : undefined;

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
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const expenseId = req.params.id;
    // console.log(expenseId);
    // console.log(trip.expenses);

    const expense = trip.expenses.filter(expense =>
      expense._id.equals(expenseId),
    )[0];
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
    const expense = trip.expenses.filter(expense =>
      expense._id.equals(expenseId),
    )[0];
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    Object.assign(expense, req.body);
    await trip.save();
    res.json(expense);
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
    //! for us to remember to delete the file of the expense as well
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    next(error);
  }
};
