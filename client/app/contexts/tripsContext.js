import { createContext, useContext, useState, useReducer } from 'react';
import { DateTime } from 'luxon';

import { tripsReducer } from '../reducers/tripsReducer';

export const TripsContext = createContext();

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
