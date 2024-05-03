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
  const { body } = req; //! for this data to be validated and then updated, the frontend should send the whole user object, not only the updated part -> i think it's better
  //! OR: we create another middleware which will find the user by id, clone it to a variable, spreading also the req.body, and after that pass the new variable to the validator -> takes more time for processing the request and sending response to front

  delete body.email;
  // console.log(body);

  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    await Trip.deleteMany({ userId: id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
