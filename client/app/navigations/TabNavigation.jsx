import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyTripsScreen from '../screens/MyTripsScreen';
import TripNameScreen from '../screens/TripNameScreen';
import DonutPieChart from '../screens/DonutPieChart';
import MyAccountScreen from '../screens/MyAccountScreen';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#036884',
      }}
    >
      <Tab.Screen
        name="MyTrips"
        component={MyTripsScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <MaterialIcons
                name="format-list-bulleted"
                size={32}
                color={color}
              />
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
                My Trips
              </Text>
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => null,
        }}
      />
      <Tab.Screen
        name="TripNameScreen"
        component={TripNameScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <AntDesign name="pushpin" size={32} color={color} />
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
                Pinned Trip
              </Text>
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => null,
        }}
      />
      <Tab.Screen
        name="DonutPieChart"
        component={DonutPieChart}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <AntDesign name="piechart" size={32} color={color} />
              <Text style={{ color: color, fontSize: 12 }}>Stats</Text>
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => null,
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Ionicons name="person" size={32} color={color} />
              <Text style={{ color: color, fontSize: 12 }}>My Account</Text>
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => null,
        }}
      />
    </Tab.Navigator>
  );
}
