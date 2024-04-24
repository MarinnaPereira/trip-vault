import { Schema, model } from "mongoose";
import Trip from "./Trip";

const statisticsSchema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: "Trip" },
  totalExpenses: { type: Number },
  totalExpensesByCategory: [{ categoryName: String, value: Number }],
});

export default model("Statistics", statisticsSchema);
