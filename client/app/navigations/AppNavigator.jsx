import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

import WelcomeScreen from '../screens/WelcomeScreen';
import AvatarScreen from '../screens/AvatarScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import TripNameScreen from '../screens/TripNameScreen';
import DonutPieChart from '../screens/DonutPieChart';
import MyAccountScreen from '../screens/MyAccountScreen';
import UnlockFirstTripScreen from '../screens/UnlockFirstTripScreen';
import InitiateTripScreen from '../screens/InitiateTripScreen';
import EditTripScreen from '../screens/EditTrip';
import TrackFirstExpenseScreen from '../screens/TrackFirstExpenseScreen';
import CategoryScreen from '../screens/CategoryScreen';
import NewExpenseScreen from '../screens/NewExpenseScreen';
import ExistentExpenseScreen from '../screens/ExistentExpense';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function SharedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UnlockFirstTrip" component={UnlockFirstTripScreen} />
      <Stack.Screen name="InitiateTrip" component={InitiateTripScreen} />
      <Stack.Screen name="Avatar" component={AvatarScreen} />
      <Stack.Screen
        name="TrackFirstExpense"
        component={TrackFirstExpenseScreen}
      />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="NewExpense" component={NewExpenseScreen} />
    </Stack.Navigator>
  );
}

function MyTripsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTrips" component={MyTripsScreen} />
    </Stack.Navigator>
  );
}

function PinnedTripStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PinnedTrip" component={TripNameScreen} />
      <Stack.Screen name="EditTrip" component={EditTripScreen} />
      <Stack.Screen name="ExistentExpense" component={ExistentExpenseScreen} />
    </Stack.Navigator>
  );
}

function StatsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Stats" component={DonutPieChart} />
    </Stack.Navigator>
  );
}

function MyAccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#036884',
        tabBarStyle: {
          height: 58,
          backgroundColor: 'white',
          display: keyboardVisible ? 'none' : 'flex',
        },
      }}
    >
      <Tab.Screen
        name="MyTripsStack"
        component={MyTripsStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <MaterialIcons
                name="format-list-bulleted"
                size={32}
                color={color}
              />
              <Text
                style={{
                  color: color,
                  fontSize: 12,
                  marginBottom: 4,
                  fontWeight: '500',
                }}
              >
                My Trips
              </Text>
            </View>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="PinnedTripStack"
        component={PinnedTripStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <AntDesign name="pushpin" size={30} color={color} />
              <Text
                style={{
                  color: color,
                  fontSize: 12,
                  marginBottom: 4,
                  fontWeight: '500',
                }}
              >
                Pinned Trip
              </Text>
            </View>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="StatsStack"
        component={StatsStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <AntDesign name="piechart" size={30} color={color} />
              <Text
                style={{
                  color: color,
                  fontSize: 12,
                  marginBottom: 4,
                  fontWeight: '500',
                }}
              >
                Stats
              </Text>
            </View>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="MyAccountStack"
        component={MyAccountStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Ionicons name="person" size={30} color={color} />
              <Text
                style={{
                  color: color,
                  fontSize: 12,
                  marginBottom: 4,
                  fontWeight: '500',
                }}
              >
                My Account
              </Text>
            </View>
          ),
          tabBarIcon: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Shared" component={SharedStack} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
