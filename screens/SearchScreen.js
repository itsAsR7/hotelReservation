import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import HotelsList from '../components/HotelsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from './Search';
import { auth } from '../dbConfig';

const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, margin: 15 }}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>
            <MaterialCommunityIcons
              name="account-circle"
              size={68}
              color="black"
            />
          </Text>
          <Text style={{ fontSize: 27, fontWeight: '500' }}>{auth.currentUser.email}</Text>

          <TouchableOpacity onPress={() => navigation.navigate('HotelList')}>
            <FontAwesome name="search" size={50} color="black" />
          </TouchableOpacity>
        </View>
        
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

        <Text style={{ marginTop: 15, fontSize: 22 }}>
          Complimentary Services
        </Text>
        <Image
          source={require('../assets/freewifi.png')}
          style={{ height: 70, width: 300, marginTop: 5}}
        />


         
        </View>
      </View>

      <HotelsList />
    </SafeAreaView>
  );
};

export default SearchScreen;
