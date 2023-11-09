import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { FlatList } from 'react-native';
import ResuseTile from '../components/ResuseTile';
import { getHotels } from '../services/apiservice';
import HotelDetails from './HotelDetails';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const HotelList = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await getHotels();
        setHotels(hotelsData);
        console.log(hotelsData);
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
    <SafeAreaView style={styles.container}>
      <View style={{ height: 50 }}>
        <AppBar
          top={10}
          left={0}
          right={0}
          titleText={'Hotel List'}
          // icon={'search'}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Bottom')}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <View style={styles.searchbox}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.input}
              value={searchKey}
              onChangeText={setSearchKey}
              placeholder="Search for Hotels to stay"
            />
          </View>

          <TouchableOpacity style={styles.searchBtn}>
            <FontAwesome name="search" size={22} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={hotels}
          keyExtractor={(item) => item.hotel_id}
          renderItem={({ item }) => (
            <ResuseTile item={item} onPress={() => onListItemPressed(item)} />
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
  searchbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 15,
    height: 50,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 50,
  },
  searchWrapper: {
    flex: 1,
    marginRight: 15,
    borderRadius: 15,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 1,
  },
});
