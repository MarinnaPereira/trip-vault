// User Router (/users):
// POST /register - for user registration.ok
// POST /login - for user authentication and login.ok
// GET /profile - to fetch the logged-in user's profile details.
// PUT /profile - to update the user's profile information.
// POST /change-password - to allow users to change their password.
// DELETE / - to delete a user account.
// ---------------------------------------------------------

import { Router } from "express";

import {
  getUser,
  updateUser,
  deleteUser,
  updateTrip,
  deleteTrip,
  getAvailableCurrencies,
  convertCurrencyAmount,
} from "../controllers/userController.js";

export const userRouter = Router();

// * Currency endpoints
userRouter.get("/currencies", getAvailableCurrencies);
userRouter.post("/convert-currency", convertCurrencyAmount);

// * User endpoints

userRouter
  .get("/:id", getUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

// * Trip endpoints

// ! create a trip is missing
userRouter
  .put("/:id/trips/:tripId", updateTrip)
  .delete("/:id/trips/:tripId", deleteTrip);

// ! create, update, delete expense
