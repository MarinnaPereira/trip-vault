import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import TabNavigation from "./app/navigations/TabNavigation";
import TripScreen from "./app/screens/TripScreen";
import MyAccountScreen from "./app/screens/MyAccountScreen";
import AvatarScreen from "./app/screens/AvatarScreen";
import CategoryScreen from "./app/screens/CategoryScreen";

import UnlockFirstTripScreen from "./app/screens/UnlockFirstTripScreen";
import TrackFirstExpenseScreen from "./app/screens/TrackFirstExpenseScreen";
import InitiateTripScreen from "./app/screens/InitiateTripScreen";
import DropdownCurrency from "./app/screens/DropdownCurrency";

import NewExpenseScreen from "./app/screens/NewExpenseScreen";
import MyTripsScreen from "./app/screens/MyTripsScreen";
import StatsScreen from "./app/screens/StatsScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* <Stack.Screen name="TabNavigation" component={TabNavigation} /> */}
        {/* <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />   */}
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerBackTitleVisible: false, title: '' }}/> */}
        {/* <Stack.Screen name="Register" component={RegisterScreen} options={{ headerBackTitleVisible: false, title: '' }}/> */}
        {/* <Stack.Screen name="Avatar" component={AvatarScreen} /> */}

        {/* <Stack.Screen name="Category" component={CategoryScreen} /> */}

        {/* <Stack.Screen
          name="UnlockFirstTrip"
          component={UnlockFirstTripScreen}
        /> */}

        <Stack.Screen
          name="TrackFirstExpenseScreen"
          component={TrackFirstExpenseScreen}
        />
        {/* 
        <Stack.Screen
          name="InitiateTripScreen"
          component={InitiateTripScreen}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="DropdownCurrency"
          component={DropdownCurrency}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen name="Trip" component={TripScreen} /> */}

        <Stack.Screen name="NewExpense" component={NewExpenseScreen} />
        {/* <Stack.Screen name="MyAccount" component={MyAccountScreen} /> */}
        {/* <Stack.Screen name="MyTrips" component={MyTripsScreen} /> */}
        {/* <Stack.Screen name="Stats" component={StatsScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
