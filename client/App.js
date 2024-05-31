import AppNavigator from './app/navigations/AppNavigator';
import { UserProvider } from './app/contexts/userContext';
import { TripsProvider } from './app/contexts/tripsContext';
import { CurrencyProvider } from './app/contexts/currencyContext';

export default function App() {
  return (
    <UserProvider>
      <TripsProvider>
        <CurrencyProvider>
          <AppNavigator />
        </CurrencyProvider>
      </TripsProvider>
    </UserProvider>
  );
}
