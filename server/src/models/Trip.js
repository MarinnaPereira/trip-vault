import { Schema, model } from 'mongoose';

const expenseSchema = new Schema({
  categoryName: {
    type: String,
    enum: [
      'Accommodation',
      'Activities',
      'Groceries',
      'Restaurants',
      'Services',
      'Shopping',
      'Taxes & Fees',
      'Transportation',
      'Others',
    ],
    required: true,
  },
  value: { type: Number, required: true },
  currency: { type: String, required: true },
  convertedAmount: { type: Number },
  description: { type: String },
  dates: [{ type: Date, required: true }],
  paymentMethod: [{ type: String }],
  receipt: { type: String }, // path
});

const tripSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  currency: { type: String, required: true },
  budget: { type: Number },
  expenses: [expenseSchema],
  // expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
});

tripSchema.methods.toJSON = function () {
  const trip = this.toObject();
  delete trip.__v;
  return trip;
};

const Trip = model('Trip', tripSchema);

export default Trip;
