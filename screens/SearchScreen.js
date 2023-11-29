import React from 'react';
import {View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
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
          <Pressable
          onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons
              name="account-circle"
              size={43}
              color="navy"
              />
              </Pressable>
         
          <Text style={{ fontSize: 25, fontWeight: '500',color:'navy' }}>{auth.currentUser.email}</Text>

          <TouchableOpacity onPress={() => navigation.navigate('HotelList')}>
            <FontAwesome name="search" size={30} color="navy" />
          </TouchableOpacity>
        </View>
        
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

        <Text style={{ marginTop: 15, fontSize: 22 }}>
       
        </Text>
        


         
        </View>
      </View>

      <HotelsList />
    </SafeAreaView>
  );
};

export default SearchScreen;
