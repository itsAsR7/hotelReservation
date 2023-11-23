import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { FlatList } from 'react-native';
import ResuseTile from '../components/ResuseTile';
import { useFocusEffect } from '@react-navigation/native';
import { getAllFavorites } from '../services/firebaseService';

const Favourite = ({ navigation }) => {
  const [favorties, setFavorites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const favoritesData = await getAllFavorites();
          setFavorites(favoritesData);
        } catch (error) {
          console.error('Error fetching hotels:', error);
        }
      };

      fetchFavorites();
    }) 
  );


  const renderItem = ({ item }) => (
    <Pressable onPress={() => onListItemPressed(item)}>
      <View style={styles.hotelCard}>
        <Image source={{uri: item.photo1}} style={styles.hotelImage} />
        <Text style={styles.hotelName}>{item.hotel_name}</Text>
        <Text style={styles.hotelLocation}>{item.city}, {item.country}</Text>
      </View>
    </Pressable>
  );

  const onListItemPressed = (hotel) => {
    navigation.navigate('HotelDetails', { hotel: hotel });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorties}
        renderItem={renderItem}
        keyExtractor={item => item.hotel_id}
      />
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom:100
  },
  hotelCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hotelImage: {
    width: '100%',
    height: 120,
  },
  cardDetails: {
    padding: 10,
  },
  hotelName: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 24, // Adjust the line height as per your preference
  },
  hotelLocation: {
    paddingHorizontal: 4,
    marginBottom: 4,
    color: '#666',
    lineHeight: 18, // Adjust the line height as per your preference
  },
  ratingContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18, // Adjust the line height as per your preference
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
