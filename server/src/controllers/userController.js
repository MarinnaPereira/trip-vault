import User from '../models/User.js';
import Trip from '../models/Trip.js';

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('selectedTrip');
    if (!user) {
      const error = new Error('User does not exist');
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  delete body.email;
  try {
    const usernameInUse = await User.findOne({
      username: body.username,
      _id: { $ne: id },
    });
    if (usernameInUse) {
      next({ status: 400, message: 'Username already in use' });
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    delete updatedUser.password;
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    const trips = await Trip.find({ userId: id });

    for (const trip of trips) {
      for (const expense of trip.expenses) {
        if (expense.receipt) {
          const originalReceiptPath = decode(expense.receipt);
          await fse.remove(originalReceiptPath);
        }
      }
    }
    await Trip.deleteMany({ userId: id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
