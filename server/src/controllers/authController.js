import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const newUser = await User.register(req.body);

    console.log(newUser);
    res.json(newUser);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    if (!user) {
      next({ status: 401, message: "Bad credential" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "672h",
    });
    res.json({ user, token });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
