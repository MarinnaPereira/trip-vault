import Trip from '../models/Trip.js';

export const sanitizeExpenseToUpdate = async (req, res, next) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    console.log(trip);
    let { body } = req;

    console.log('body', body);

    const wholeExpense = {
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
    next();
  } catch (error) {
    next(error);
  }
};
