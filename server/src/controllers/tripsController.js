import Trip from '../models/Trip';

export const getAllTrips = async (req, res, next) => {
  const { userId } = req.body;
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
  const { userId, name, start, end, duration, currency, budget } = req.body;
  try {
    const newTrip = new Trip({
      userId,
      name,
      start,
      end,
      duration,
      currency,
      budget,
    });
    const savedTrip = await newTrip.save();
    res.json(savedTrip);
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
    res.json(trip);
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req, res, next) => {
  const { id } = req.params;
  const tripData = req.body; //! for this data to be validated and then updated, the frontend should send the whole trip object, not only the updated part
  //! OR: we create another middleware which will find the trip by id, clone it to a variable, spreading also the req.body, and after that pass the new variable to the validator -> i think it's better!
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
  const { tripId } = req.params;
  try {
    const deletedTrip = await Trip.findByIdAndDelete(tripId);
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};
