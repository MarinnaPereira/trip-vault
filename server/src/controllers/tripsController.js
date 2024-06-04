import { isValidObjectId } from 'mongoose';

import Trip from '../models/Trip.js';
import User from '../models/User.js';

export const getAllTrips = async (req, res, next) => {
  const userId = req.userInfo._id;
  try {
    const trips = await Trip.find({ userId });
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found for this user' });
    }
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

export const addTrip = async (req, res, next) => {
  const userId = req.userInfo._id;
  const { name, start, end, currency, budget } = req.body;
  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }
  try {
    const newTrip = new Trip({
      userId,
      name,
      start,
      end,
      currency,
      budget,
    });
    const savedTrip = await newTrip.save();
    const user = await User.findById(userId);
    user.selectedTrip = savedTrip._id;
    await user.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    next(error);
  }
};

export const getTrip = async (req, res, next) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const user = await User.findById(trip.userId);
    user.selectedTrip = id;
    await user.save();
    res.json(trip);
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req, res, next) => {
  const { id } = req.params;
  const tripData = req.body;
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(id, tripData, {
      new: true,
    });
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userInfo._id;
  try {
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    for (const expense of trip.expenses) {
      if (expense.receipt) {
        const originalReceiptPath = decode(expense.receipt);
        await fse.remove(originalReceiptPath);
      }
    }
    await Trip.findByIdAndDelete(id);
    const user = await User.findById(userId);
    const trips = await Trip.find({ userId });
    if (!trips) {
      user.selectedTrip = null;
    } else {
      user.selectedTrip = trips[trips.length - 1];
    }
    await user.save();
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};
