import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    enum: [
      "Accommodation",
      "Activities",
      "Groceries",
      "Restaurants",
      "Services",
      "Shopping",
      "Taxes & Fees",
      "Transportation",
      "Others",
    ],
    required: true,
    unique: true,
  },
  total: { type: Number, required: true },
});

const expenseSchema = new Schema({
  categoryName: { type: String, required: true },
  value: { type: Number, required: true },
  currency: { type: String, required: true },
  convertedAmount: { type: Number }, // renamed from convertedValue to streamline naming
  description: { type: String },
  dates: [{ type: Date, required: true }],
  paymentMethod: [{ type: String }],
  receipt: { type: String },
});

const tripSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, required: true },
  currency: { type: String, required: true },
  budget: { type: Number },
  expenseCategories: [{ categorySchema }],
  expenses: [{ expenseSchema }],
});

export default model("Trip", tripSchema);
