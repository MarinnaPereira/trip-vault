import User from "../models/User.js";
import Trip from "../models/Trip.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate("trips")
      .populate("selectedTrip");
    if (!user) {
      const error = new Error("User does not exist");
      error.status = 404;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
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
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req, res, next) => {
  console.log(req.params);
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
