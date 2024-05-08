import { createContext, useReducer, useContext, useEffect } from 'react';

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
      return state.map(trip =>
        trip._id === action.tripId
          ? { ...trip, expenses: [...trip.expenses, action.payload] }
          : trip,
      );
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

  return (
    <TripsContext.Provider value={{ trips, dispatch }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => {
  return useContext(TripsContext);
};
