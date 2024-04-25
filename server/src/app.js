import express from "express";
import cors from "cors";
import morgan from "morgan";

import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);

// error handling
app.use((req, res, next) => {
  const error = new Error("Route is not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ error: err.message || "Something went wrong!" });
});

export default app;
