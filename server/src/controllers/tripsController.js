import Trip from '../models/Trip';
import { getExchangeRates } from '../utilities/currencyService.js';
import { convertCurrency } from '../utilities/currencyConverter.js';

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

  const { expenses } = req.body;
  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // currency conversion for expenses
    if (expenses) {
      await Promise.all(
        expenses.map(async expense => {
          if (expense.currency !== trip.currency) {
            const rates = await getExchangeRates(expense.currency);
            const fromRate = rates[expense.currency]; // rate of expense currency
            const toRate = rates[trip.currency]; // rate of trips base/home currency
            expense.convertedValue = convertCurrency(
              expense.value,
              fromRate,
              toRate,
            );
          }
          trip.expenses.push(expense);
        }),
      );
    }

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(400).json({ message: error.message });
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

// get available currencies
export const getAvailableCurrencies = async (req, res, next) => {
  try {
    const baseCurrency = req.query.baseCurrency || 'USD';
    const exchangeRates = await getExchangeRates(baseCurrency);
    if (!exchangeRates) {
      return res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
    res.json({ currencies: Object.keys(exchangeRates) }); // using Object.keys to list currency codes
  } catch (error) {
    next(error);
  }
};

export const convertCurrencyAmount = async (req, res, next) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  try {
    const rates = await getExchangeRates(fromCurrency);
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
      return res.status(400).json({
        error: 'Invalid currency code provided or rates not available.',
      });
    }
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    const convertedAmount = convertCurrency(amount, fromRate, toRate);
    res.json({ convertedAmount });
  } catch (error) {
    console.error('Error converting currency:', error);
    next(error);
  }
};
