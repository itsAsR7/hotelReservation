import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HotelsList from '../components/HotelsList';
import { SafeAreaView } from 'react-native-safe-area-context';


const SearchScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, margin:5 }}>
      <Text></Text>

      

      <HotelsList />
    </SafeAreaView>
  );
};

export default SearchScreen;
