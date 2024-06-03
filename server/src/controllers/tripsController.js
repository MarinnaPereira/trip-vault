import { isValidObjectId } from 'mongoose';

import Trip from '../models/Trip.js';
import User from '../models/User.js';

export const getAllTrips = async (req, res, next) => {
  const userId = req.userInfo._id;
  console.log(userId);
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
  console.log(req.body);

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
    console.log('Saving new trip...');
    const savedTrip = await newTrip.save();
    console.log('New trip saved:', savedTrip);
    console.log('Finding user by ID...');
    const user = await User.findById(userId);
    console.log('User found:', user);
    console.log("Updating user's selected trip...");
    user.selectedTrip = savedTrip._id;
    await user.save();
    console.log('User updated with new trip');

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
    console.log(user);
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
    // Find the trip by its ID
    const trip = await Trip.findById(id);

    // Check if the trip exists
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Iterate over expenses of the trip
    for (const expense of trip.expenses) {
      // Check if the expense has a receipt path
      if (expense.receipt) {
        // Decode receipt path if necessary
        const originalReceiptPath = decode(expense.receipt);
        // Remove the receipt file
        await fse.remove(originalReceiptPath);
      }
    }

    // Delete the trip
    await Trip.findByIdAndDelete(id);

    // Update User selected trip
    const user = await User.findById(userId);
    const trips = await Trip.find({ userId });
    if (!trips) {
      user.selectedTrip = null;
    } else {
      user.selectedTrip = trips[trips.length - 1];
    }
    await user.save();

    res.status(204).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};
