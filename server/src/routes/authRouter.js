import { Router } from "express";
import { validateUser } from "../middlewares/validateUser.js";
import { createUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";

export const authRouter = Router();

authRouter
  .post("/register", validateUser, createUser)
  .post("/login", loginUser);
