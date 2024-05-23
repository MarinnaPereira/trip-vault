import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { updateUser } from '../api/api';
import SearchBar from './SearchBar';

export default function MyTripsScreen({ navigation }) {
  const { trips, setPinnedTrip } = useTripsContext();
  const { user, setUser } = useUserContext();
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips, trips.length]);

  const handleTripPress = async item => {
    setPinnedTrip(item);
    const updatedUser = { ...user, selectedTrip: item };
    setUser(updatedUser);
  };

  useEffect(() => {
    console.log('user my trips', user);
    user &&
      (async () => {
        const newSelectedTripId = user.selectedTrip._id;
        const res = await updateUser({
          ...user,
          selectedTrip: newSelectedTripId,
        });

        if (typeof res !== 'string') handleNavigation();
      })();
  }, [user]);

  const handleNavigation = () => {
    navigation.navigate('Main', {
      screen: 'PinnedTripStack',
      params: {
        screen: 'TripNameScreen',
      },
    });
  };

  const handleAddTrip = () => {
    navigation.navigate('Shared', { screen: 'InitiateTrip' });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
    >
      <FlatList
        data={trips}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <View className="mt-24 justify-start items-left">
              <Text className="text-3xl ml-4 mb-7 text-[#00b0a3] font-bold items-start">
                My Trips
              </Text>
            </View>
            <View className=" flex-1 items-center">
              <View>
                <SearchBar trips={trips} setFilteredTrips={setFilteredTrips} />

                {filteredTrips.map(item => (
                  <TouchableOpacity
                    onPress={() => handleTripPress(item)}
                    key={item._id}
                    style={{ marginTop: 10 }}
                  >
                    <View className="p-3 bg-lightGray rounded-md ">
                      <Text className="w-[360px] px-1 text-lg text-black font-bold relative">
                        {item.name}
                      </Text>
                      <Text className="w-[360px] pl-1 text-lg text-black">
                        {new Date(item.start).toLocaleDateString()} –{' '}
                        {new Date(item.end).toLocaleDateString()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        }
      />
      <View style={{ position: 'absolute', bottom: 0, right: 8 }}>
        <TouchableOpacity onPress={handleAddTrip}>
          <Image
            source={require('../../assets/images/plus.png')}
            style={{ width: 80, height: 80 }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
