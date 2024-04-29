import Trip from '../models/Trip.js';

export const sanitizeTripToUpdate = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    console.log(trip);
    let { body } = req;

    console.log('body', body);

    const wholeTrip = {
      userId: trip.userId,
      name: body.name || trip.name,
      start: body.start || trip.start,
      end: body.end || trip.end,
      currency: body.currency || trip.currency,
      budget: body.budget || trip.budget,
    };

    console.log('whole trip', wholeTrip);

    req.body = wholeTrip;
    console.log('req.body:', body);
    next();
  } catch (error) {
    next(error);
  }
};
