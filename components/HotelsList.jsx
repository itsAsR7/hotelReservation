import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HotelCard from './HotelCard';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getHotels } from '../services/apiservice';

const HotelsList = () => {
  const navigation = useNavigation();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await getHotels();
        setHotels(hotelsData);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const onListItemPressed = (hotel) => {
    navigation.navigate('HotelDetails', { hotel: hotel });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingEnd: 10 }}>Featured Hotels</Text>
          <SimpleLineIcons name="badge" size={20} color="red" />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('HotelList')}>
            <Ionicons name="list-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={hotels}
        horizontal
        keyExtractor={(item) => item.hotel_id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 20 }}
        renderItem={({ item }) => (
          <HotelCard
            item={item}
            margin={10}
            onPress={() => onListItemPressed(item)}
          />
        )}
      />
    </View>
  );
};

export default HotelsList;

const styles = StyleSheet.create({});
