import Trip from '../models/Trip.js';

export const sanitizeExpenseToUpdate = async (req, res, next) => {
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

    let { body } = req;

    console.log('body', body);

    const wholeExpense = {
      tripId: tripId,
      categoryName: body.categoryName || expense.categoryName,
      value: body.value || expense.value,
      currency: body.currency || expense.currency,
      convertedAmount: body.convertedAmount || expense.convertedAmount,
      description: body.description || expense.description,
      dates: body.dates || expense.dates,
      paymentMethod: body.paymentMethod || expense.paymentMethod,
      receipt: body.receipt || expense.receipt,
    };

    console.log('whole expense', wholeExpense);

    req.body = wholeExpense;
    console.log('req.body:', body);
    console.log('expense sanitized');
    next();
  } catch (error) {
    next(error);
  }
};
