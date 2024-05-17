import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './app/contexts/userContext';
import { TripsProvider } from './app/contexts/tripsContext';
import { CurrencyProvider } from './app/contexts/currencyContext';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import TabNavigation from './app/navigations/TabNavigation';
import MyAccountScreen from './app/screens/MyAccountScreen';
import AvatarScreen from './app/screens/AvatarScreen';
import CategoryScreen from './app/screens/CategoryScreen';
import UnlockFirstTripScreen from './app/screens/UnlockFirstTripScreen';
import TrackFirstExpenseScreen from './app/screens/TrackFirstExpenseScreen';
import InitiateTripScreen from './app/screens/InitiateTripScreen';
import DropdownCurrency from './app/screens/DropdownCurrency';
import SearchBar from './app/screens/SearchBar';
import TripNameScreen from './app/screens/TripNameScreen';
import NewExpenseScreen from './app/screens/NewExpenseScreen';
import MyTripsScreen from './app/screens/MyTripsScreen';
import DonutPieChart from './app/screens/DonutPieChart';
import PaymentMethodModal from './app/modals/PaymentMethodModal';
import UploadPictureModal from './app/modals/UploadPictureModal';
import EditUsernameModal from './app/modals/EditUsernameModal';
import OtherPaymentModal from './app/modals/OtherPaymentModal';
import PictureScreen from './app/screens/PictureScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <TripsProvider>
        <CurrencyProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Avatar"
                component={AvatarScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UnlockFirstTrip"
                component={UnlockFirstTripScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="InitiateTripScreen"
                component={InitiateTripScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrackFirstExpenseScreen"
                component={TrackFirstExpenseScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="NewExpense"
                component={NewExpenseScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TripNameScreen"
                component={TripNameScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="TabNavigation"
                component={TabNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="InitiateTrip"
                component={InitiateTripScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DonutPieChart"
                component={DonutPieChart}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DropdownCurrency"
                component={DropdownCurrency}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SearchBar"
                component={SearchBar}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="MyAccount"
                component={MyAccountScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyTrips"
                component={MyTripsScreen}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen name="PaymentMethod" component={PaymentMethodModal} options={{ headerShown: false }}/>
              {/* <Stack.Screen name="UploadPicture" component={UploadPictureModal} options={{ headerShown: false }}/> */}
              {/* <Stack.Screen name="EditUsername" component={EditUsernameModal} options={{ headerShown: false }}/> */}
              {/* <Stack.Screen name="OtherPayment" component={OtherPaymentModal} options={{ headerShown: false }}/> */}
              {/* <Stack.Screen name="Picture" component={PictureScreen} options={{ headerShown: false }}/> */}
            </Stack.Navigator>
          </NavigationContainer>
        </CurrencyProvider>
      </TripsProvider>
    </UserProvider>
  );
}
