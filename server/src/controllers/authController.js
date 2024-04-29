import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const addUser = async (req, res, next) => {
  const { username, email, password, avatar } = req.body; //!
  const newUser = { username, email, password, avatar };
  try {
    const registeredUser = await User.register(newUser);
    res.json(registeredUser);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  const { username, email, password } = req.body; //!
  try {
    const user = await User.login({ username, email, password });
    if (!user) {
      next({ status: 401, message: 'Bad credential' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: '168h',
    });
    res.json({ user, token });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
