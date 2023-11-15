import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { ScrollView } from 'react-native';
import { Rating } from 'react-native-stock-star-rating';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { auth } from "../dbConfig";
import { addFavorite, checkIfHotelIsFavorite, removeFavorite } from '../services/firebaseService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HotelDetails = ({ route, navigation }) => {

  const { hotel } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  
  const [bookingHotelDetails, setBookingHotelDetails] = useState('');

  useEffect(() => {
    checkIfFavorite();
    setBookingHotelDetails(hotel)
  }, []);

  const handleBookNowPress = () => {
    navigation.navigate('BookingScreen', {hotel});
  };

  const checkIfFavorite = async () => {
    const isFavoriteInFirebase = await checkIfHotelIsFavorite(hotel.hotel_id);

    setIsFavorite(isFavoriteInFirebase);
  };

  const toggleFavorite = async () => {
    const hotelData = {
      hotel_id: hotel.hotel_id,
      hotel_name: hotel.hotel_name,
      photo1: hotel.photo1,
      city: hotel.city,
      country: hotel.country,
      star_rating: hotel.star_rating,
      rates_from: hotel.rates_from,
      number_of_reviews: hotel.number_of_reviews,
      overview: hotel.overview,
      rates_from: hotel.rates_from,
    };
    if (isFavorite) {
      await removeFavorite(hotelData.hotel_id);
      setIsFavorite(false); // Update the state immediately
    } else {
      await addFavorite(hotelData);
      setIsFavorite(true); // Update the state immediately
    }
  };

  return (
    <ScrollView>
      <View style={{ height: 100 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          titleText={hotel.hotel_name}
          icon={'search'}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Bottom')}
        />
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: hotel.photo1 }}
          width={windowWidth - 20}
          height={220}
          borderRadius={24}
        />
        <View style={styles.titleContainer}>
          <View style={styles.titleColumn}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: '600',
              }}
            >
              {hotel.hotel_name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {hotel.city}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Rating
                maxStars={5}
                stars={hotel.star_rating}
                bordered={false}
                color={'#fd9942'}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'grey',
                  marginLeft: 10,
                }}
              >
                {`(${hotel.number_of_reviews})`}
              </Text>
              <View style={styles.favoriteContainer}>
                <TouchableOpacity onPress={toggleFavorite}>
                  <AntDesign
                    name={isFavorite ? 'heart' : 'hearto'}
                    size={30}
                    color={isFavorite ? 'red' : 'black'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40, paddingTop: 90 }}>
          <Text style={{ fontSize: 22, marginBottom: 10 }}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={8}
            value={hotel.overview}
            editable={false}
          />
        </View>

        <View
          style={[
            { flexDirection: 'row', justifyContent: 'space-between' },
            styles.bottom,
          ]}
        >
          <View>
            <Text style={{ fontSize: 24 }}>{`\$ ${hotel.rates_from}`}</Text>
            <Text style={{ fontSize: 16, color:'gray' }}>Jan 01- Feb 12</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleBookNowPress} style={styles.btn} >
            <Text style={{fontWeight:'600'}} >Book Now</Text>
            </TouchableOpacity>
          </View>         
        </View>
      </View>
    </ScrollView>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#efefef',
    height: windowHeight,
    alignItems: 'center',
  },
  titleContainer: {
    margin: 5,
    backgroundColor: '#fff',
    height: 'auto',
    position: 'absolute',
    top: 190,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  titleColumn: {
    padding: 15,
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 260, // Adjust as needed
  },
  bottom: {
    marginTop:20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 90,
    width:windowWidth - 20,  
    paddingVertical: 20,
  },
  btn:{
    width:(windowWidth - 40)/2.2,
    backgroundColor:'green',
    color:'#fff',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderRadius:10
  }
});
