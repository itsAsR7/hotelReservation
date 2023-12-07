// BookingScreen.js

import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

import { db, app, auth } from "../dbConfig"
import { collection, addDoc } from 'firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params;
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleBookNow = async () => {
    // Perform the booking logic here (e.g., save data to Firebase)

    const bookingData = {
      image: hotel.photo1,
      hotelName: hotel.hotel_name,
      city: hotel.city,
      country: hotel.country,
      people: numberOfPeople,
      totalPrice: hotel.rates_from,
      id: auth.currentUser.uid,
      hotelID: hotel.hotel_id,
      longitude: hotel.longitude,
      latitude: hotel.latitude


    }

    // Save to Firebase Realtime Database
    try {






      const docRef = await addDoc(collection(db, 'Bookings'), bookingData);
      alert('Success!', 'This hotel booking has been added to your bookings list.');
      console.log('Document written with ID: ', docRef.id);

    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleIncrement = () => {
    if (numberOfPeople <4)
      setNumberOfPeople(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prevCount => prevCount - 1);
    }
  };

  return (
    <View style={styles.container}>



      <Image
        style={{marginBottom:30,marginTop:20}}
        source={{ uri: hotel.photo1 }}
        width={windowWidth - 80}
        height={320}
        borderRadius={24}
      />



      <View style={styles.details}>


        <Text style={{ fontSize: 30 }}>{hotel.hotel_name}</Text>
        <Text style={{ fontSize: 30 }}>{hotel.city}, {hotel.country}</Text>

        <Text style={{ fontSize: 30 }}>${hotel.rates_from}</Text>

      </View>

      <Text style={styles.subtitle}>Number of People:</Text>
      <View style={styles.stepperContainer}>
        <Button title="-" onPress={handleDecrement} />
        <Text style={styles.stepperValue}>{numberOfPeople}</Text>
        <Button title="+" onPress={handleIncrement} />
      </View>


      <TouchableOpacity onPress={handleBookNow} style={styles.btn} >
        <Text style={{ fontWeight: '600' }} >Book Now</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Check Out')} style={styles.btn} >
        <Text style={{ fontWeight: '600' }} >Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 20,

    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize:24,
    marginTop: 16,
    marginBottom: 8,
  },
  stepperContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepperValue: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  details: {
    fontSize: 50,


  },
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
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 90,
    width: windowWidth - 20,
    paddingVertical: 20,
  },
  btn: {
    marginTop:20,
    width:300,
    backgroundColor: 'green',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10
  }
});

export default BookingScreen;
