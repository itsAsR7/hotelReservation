import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import HotelsList from '../components/HotelsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from './Search';

const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, margin: 15 }}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text >
            <MaterialCommunityIcons
              name="account-circle"
              size={28}
              color="black"
            />
          </Text>
          <Text style={{ fontSize:24, fontWeight:'500'}}>Hey Dilpreet</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <FontAwesome name="search" size={22} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 15, fontSize: 14 }}>
          Complimentary Services
        </Text>
        <Image
          source={require('../assets/freewifi.png')}
          style={{ height: 60, width: 300, marginTop: 20 }}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets/offer.png')}
            style={{
              height: 60,
              width: 300,
              marginBottom: 20,
              borderRadius: 18,
            }}
          />
        </View>
      </View>

      <HotelsList />
    </SafeAreaView>
  );
};

export default SearchScreen;
