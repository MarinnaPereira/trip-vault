import User from '../models/User.js';
// import Trip from "../models/Trip.js";
// import { getExchangeRates } from "../utilities/currencyService.js";
// import { convertCurrency } from "../utilities/currencyConverter.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      // .populate('trips') //!
      .populate('selectedTrip');
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
  const { body } = req; //! for this data to be validated and then updated, the frontend should send the whole user object, not only the updated part
  //! OR: we create another middleware which will find the user by id, clone it to a variable, spreading also the req.body, and after that pass the new variable to the validator -> i think it's better!
  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
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
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// export const updateTrip = async (req, res, next) => {
//   const { tripId } = req.params;
//   const { expenses } = req.body;

//   try {
//     const trip = await Trip.findById(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     // currency conversion for expenses
//     if (expenses) {
//       await Promise.all(
//         expenses.map(async (expense) => {
//           if (expense.currency !== trip.currency) {
//             const rates = await getExchangeRates(expense.currency);
//             const fromRate = rates[expense.currency]; // rate of expense currency
//             const toRate = rates[trip.currency]; // rate of trips base/home currency
//             expense.convertedValue = convertCurrency(
//               expense.value,
//               fromRate,
//               toRate
//             );
//           }
//           trip.expenses.push(expense);
//         })
//       );
//     }

//     const updatedTrip = await trip.save();
//     res.json(updatedTrip);
//   } catch (error) {
//     console.error("Error updating trip:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteTrip = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Trip.findByIdAndDelete(id);
//     res.json({ message: "Trip deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // get available currencies
// export const getAvailableCurrencies = async (req, res, next) => {
//   try {
//     const baseCurrency = req.query.baseCurrency || "USD";
//     const exchangeRates = await getExchangeRates(baseCurrency);
//     if (!exchangeRates) {
//       return res.status(500).json({ error: "Failed to fetch exchange rates" });
//     }
//     res.json({ currencies: Object.keys(exchangeRates) }); // using Object.keys to list currency codes
//   } catch (error) {
//     next(error);
//   }
// };

// export const convertCurrencyAmount = async (req, res, next) => {
//   const { amount, fromCurrency, toCurrency } = req.body;
//   try {
//     const rates = await getExchangeRates(fromCurrency);
//     if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
//       return res.status(400).json({
//         error: "Invalid currency code provided or rates not available.",
//       });
//     }
//     const fromRate = rates[fromCurrency];
//     const toRate = rates[toCurrency];
//     const convertedAmount = convertCurrency(amount, fromRate, toRate);
//     res.json({ convertedAmount });
//   } catch (error) {
//     console.error("Error converting currency:", error);
//     next(error);
//   }
// };
