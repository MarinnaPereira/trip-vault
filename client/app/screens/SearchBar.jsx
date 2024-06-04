import { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useTripsContext } from '../contexts/tripsContext';

const SearchBar = ({ trips, setFilteredTrips }) => {
  const { pinnedTrip } = useTripsContext();

  const [searchQuery, setSearchQuery] = useState('');

  // useFocusEffect(
  //   useCallback(() => {
  //     setSearchQuery('');
  //   }, []),
  // );

  const reversedTrips = [...trips].reverse();
  const notPinnedTrips = reversedTrips.filter(
    trip => trip._id !== pinnedTrip._id,
  );
  const orderedTrips = [pinnedTrip, ...notPinnedTrips];

  const handleSearch = text => {
    const filteredTrips = orderedTrips.filter(trip =>
      trip.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredTrips(filteredTrips);
    setSearchQuery(text);
    if (text === '') setFilteredTrips(orderedTrips);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredTrips(trips);
  };

  return (
    <View className="flex-1 items-center">
      <View className="flex-row w-[380px] mb-2 bg-lightGray rounded-md py-2 px-3 items-center">
        <Feather name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search trip by name..."
          value={searchQuery}
          onChangeText={text => handleSearch(text)}
          className="flex-1 pl-2 text-lg text-[#999]"
        />
        <TouchableOpacity onPress={handleClearSearch}>
          <Feather name="x" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
