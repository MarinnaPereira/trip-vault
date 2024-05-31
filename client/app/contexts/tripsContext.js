import { createContext, useContext, useState, useReducer } from 'react';
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
      const newTripsArray = [...state, action.payload];
      return [...newTripsArray];
    case 'UPDATE_TRIP':
      return state.map(trip =>
        trip._id === action.payload._id ? action.payload : trip,
      );
    case 'DELETE_TRIP':
      return state.filter(trip => trip._id !== action.payload._id);
    case 'DELETE_ALL_TRIPS':
      return [];
    case 'ADD_EXPENSE':
      return state.map(trip => {
        return trip._id === action.trip._id
          ? { ...trip, expenses: [...trip.expenses, action.payload] }
          : trip;
      });
    case 'UPDATE_EXPENSE':
      return state.map(trip => {
        return trip._id === action.trip._id
          ? {
              ...trip,
              expenses: trip.expenses.map(expense => {
                return expense._id === action.expenseId
                  ? action.payload
                  : expense;
              }),
            }
          : trip;
      });
    case 'DELETE_EXPENSE':
      return state.map(trip => {
        console.log('tripId', action.trip._id);
        console.log(trip._id === action.trip._id);
        return trip._id === action.trip._id
          ? {
              ...trip,
              expenses: trip.expenses.filter(
                expense => expense._id !== action.payload._id,
              ),
            }
          : trip;
      });

    default:
      throw new Error('You action type does not exist!');
  }
};

export const TripsProvider = ({ children }) => {
  const [trips, dispatch] = useReducer(tripsReducer, []);
  const [pinnedTrip, setPinnedTrip] = useState(null);

  const calculateTripDuration = trip => {
    if (!trip) {
      console.log('No trip data available.');
      return 0;
    }
    const { start, end } = trip;
    if (!start || !end) {
      console.log('Trip start or end date is missing.');
      return 0;
    }
    const tripDuration = Math.ceil(
      DateTime.fromISO(end).diff(DateTime.fromISO(start), 'days').days + 1,
    );
    return parseInt(tripDuration, 10);
  };

  const calculateTotalSpent = trip => {
    if (!trip) {
      console.log('No trip data available.');
      return 0;
    }
    const tripExpenses = trip.expenses || [];
    let totalSpent = 0;
    for (const expense of tripExpenses) {
      totalSpent += expense.convertedAmount || expense.value;
    }
    return Number(totalSpent).toFixed(2);
  };

  const calculateDailyAverage = (totalSpent, tripDuration) => {
    if (tripDuration === 0) return '0.00';
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
