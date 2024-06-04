export const tripsReducer = (state, action) => {
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
        if (trip._id === action.trip._id) {
          return {
            ...trip,
            expenses: trip.expenses.map(expense =>
              expense._id === action.expenseId ? action.payload : expense,
            ),
          };
        }
        return trip;
      });
    case 'DELETE_EXPENSE':
      return state.map(trip => {
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
