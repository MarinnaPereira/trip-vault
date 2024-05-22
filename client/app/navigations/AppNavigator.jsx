import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import AvatarScreen from '../screens/AvatarScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import TripNameScreen from '../screens/TripNameScreen';
import DonutPieChart from '../screens/DonutPieChart';
import MyAccountScreen from '../screens/MyAccountScreen';
import NewExpenseScreen from '../screens/NewExpenseScreen';
import CategoryScreen from '../screens/CategoryScreen';
import UnlockFirstTripScreen from '../screens/UnlockFirstTripScreen';
import InitiateTripScreen from '../screens/InitiateTripScreen';
import TrackFirstExpenseScreen from '../screens/TrackFirstExpenseScreen';

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
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#036884',
        tabBarStyle: {
          height: 56,
          backgroundColor: 'white',
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
              <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
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
              <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
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
              <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
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
              <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Shared" component={SharedStack} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
