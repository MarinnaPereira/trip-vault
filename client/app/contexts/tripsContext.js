import { createContext, useReducer, useContext, useState } from 'react';
import { DateTime } from 'luxon';

export const TripsContext = createContext();

const tripsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ALL_TRIPS':
      if (!Array.isArray(action.payload)) {
        console.log('Payload is not an array');
        return state;
      }
      return [...action.payload];
    case 'ADD_TRIP':
      return [...state, action.payload];
    case 'UPDATE_TRIP':
      return state.map(trip =>
        trip._id === action.payload._id ? action.payload : trip,
      );
    case 'DELETE_TRIP':
      return state.filter(trip => trip._id !== action.payload);
    case 'DELETE_ALL_TRIPS':
      return [];
    case 'ADD_EXPENSE':
      console.log('action', action);

      return state.map(trip => {
        console.log('tripId', trip._id);
        console.log(trip._id === action.trip._id);
        return trip._id === action.trip._id
          ? { ...trip, expenses: [...trip.expenses, action.payload] }
          : trip;
      });
    case 'UPDATE_EXPENSE':
      return state.map(trip =>
        trip._id === action.tripId
          ? {
              ...trip,
              expenses: trip.expenses.map(expense =>
                expense._id === action.expenseId ? action.payload : expense,
              ),
            }
          : trip,
      );
    case 'DELETE_EXPENSE':
      return state.map(trip =>
        trip._id === action.tripId
          ? {
              ...trip,
              expenses: trip.expenses.filter(
                expense => expense._id !== action.payload,
              ),
            }
          : trip,
      );

    default:
      throw new Error('You action type does not exist!');
  }
};

export const TripsProvider = ({ children }) => {
  const [trips, dispatch] = useReducer(tripsReducer, []);
  const [pinnedTrip, setPinnedTrip] = useState(null);

  const calculateTripDuration = trip => {
    const { start, end } = trip;
    const tripDuration = Math.ceil(
      // Using Math.ceil to round up the number of days
      DateTime.fromISO(end) // Parse end date string to Luxon DateTime object
        .diff(DateTime.fromISO(start), 'days').days + 1, // Calculate difference in days // Add 1 to include both start and end days
    );
    return parseInt(tripDuration);
  };

  const calculateTotalSpent = trip => {
    const tripExpenses = trip.expenses;
    let totalSpent = 0;

    for (const expense of tripExpenses) {
      if (expense.convertedAmount) {
        totalSpent += expense.convertedAmount;
      } else {
        totalSpent += expense.value;
      }
    }

    return Number(totalSpent).toFixed(2);
  };

  const calculateDailyAverage = (totalSpent, tripDuration) => {
    const dailyAverage = (totalSpent / tripDuration).toFixed(2);
    return dailyAverage;
  };

  const calculateBalance = (budget, totalSpent) => {
    const balance = budget - totalSpent;
    return balance.toFixed(2);
  };

  return (
    <TripsContext.Provider
      value={{
        trips,
        dispatch,
        pinnedTrip,
        setPinnedTrip,
        calculateTripDuration,
        calculateTotalSpent,
        calculateDailyAverage,
        calculateBalance,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => {
  return useContext(TripsContext);
};
