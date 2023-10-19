import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { FlatList } from 'react-native';
import ResuseTile from '../components/ResuseTile';
import HotelDetails from './HotelDetails';

const HotelList = ({ navigation }) => {
  const hotels = [
    {
      _id: '64c674d23cfa5e847bcd5430',
      country_id: '64c62bfc65af9f8c969a8d04',
      title: 'Sunset Resort',
      imageUrl:
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.9,
      review: '1204 Reviews',
      location: 'Miami Beach, FL',
    },
    {
      _id: '64c675183cfa5e847bcd5433',
      country_id: '64c62bfc65af9f8c969a8d04',
      title: 'Mountain Lodge',
      imageUrl:
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.5,
      review: '12024 Reviews',
      location: 'CarCass, CO',
    },
    {
      _id: '64d0b5a4d3cb4985a76ac1aa',
      country_id: '64c62bfc65af9f8c969a8d04',
      title: 'Hotel UniLo',
      imageUrl:
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.7,
      review: '1204 Reviews',
      location: 'MountainView, USA',
    },
    {
      _id: '64c675be3cfa5e847bcd5439',
      country_id: '64c62bfc65af9f8c969a8d04',
      title: 'Family-Friendly Resort',
      imageUrl:
        'https://d326fntlu7tb1e.cloudfront.net/uploads/3e6222dc-6b79-4031-914b-60c220782b72-ff.jpeg',
      rating: 4.6,
      review: '12854 Reviews',
      location: 'Orlando, FL',
    },
    {
      _id: '64c67442776ed29f19727fd7',
      country_id: '64c62bfc65af9f8c969a8d04',
      title: 'Luxury Hotel 1',
      imageUrl:
        'https://d326fntlu7tb1e.cloudfront.net/uploads/4fdc30c2-08c5-4bca-b05c-d8b8a60b020f-luxury1.webp',
      rating: 4.7,
      review: '1204 Reviews',
      location: 'New York City, NY',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 50 }}>
        <AppBar
        top={10}
        left={0}
        right={0}
          titleText={'Hotel List'}
          icon={'search'}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Bottom')}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={hotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ResuseTile
              item={item}
              onPress={() => navigation.navigate('HotelDetails', item._id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HotelList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
