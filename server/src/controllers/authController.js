import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const addUser = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;
  const newUser = { username, email, password, avatar };
  try {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      next({ status: 400, message: 'Username already in use' });
      return;
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      next({ status: 400, message: 'Email already in use' });
      return;
    }
    const registeredUser = await User.register(newUser);
    res.json(registeredUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { credential, password } = req.body;
  try {
    const user = await User.login({ credential, password });
    if (!user) {
      next({ status: 401, message: 'Bad credential' });
      return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '168h',
    });
    res.json({ user, token });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
