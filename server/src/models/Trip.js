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
  duration: { type: Number, required: true },
  currency: { type: String, required: true },
  budget: { type: Number },
  expenses: [expenseSchema],
});

const Trip = model('Trip', tripSchema);

export default Trip;
