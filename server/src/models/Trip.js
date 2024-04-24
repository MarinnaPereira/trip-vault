import { Schema, model } from "mongoose";
import User from "./User";
import Statistics from "./Statistics";

const tripSchema = new Schema({
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, required: true },
  currency: { type: String, required: true },
  budget: { type: Number },
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }], //! expense schema still not done
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  totalSpent: { type: Number },
  spentToday: { type: Number },
  balance: { type: Number },
  dailyAverage: { type: Number },
  statistics: { type: Schema.Types.ObjectId, ref: "Statistics" },
});

export default model("Trip", tripSchema);
