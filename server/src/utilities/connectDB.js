import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  mongoose.connection.on("error", console.error).on("open", () => {
    console.log("[Database]: connection open");
  });
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (err) {
    console.error(err);
  }
};
