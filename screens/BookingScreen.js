// BookingScreen.js

import React, { useState } from 'react';
import { Image,View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import { db } from "../dbConfig"
import { collection, addDoc } from 'firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookingScreen = ({ route }) => {
  const { hotel } = route.params;
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleBookNow = async() => {
    // Perform the booking logic here (e.g., save data to Firebase)

    const bookingData = {
      hotelName: "hotel.name",
      city: "hotel.city",
      country: "hotel.country",
      numberOfPeople,
      totalPrice: hotel.price * numberOfPeople,
    };

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
    if (numberOfPeople<=3)
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
      style={{}}
          source={{ uri: hotel.photo1 }}
          width={windowWidth - 20}
          height={320}
          borderRadius={24}
        />



      <View style ={styles.details}>

      <Text style ={{fontSize:30}}>{hotel.hotel_name}</Text>
      <Text style ={{fontSize:30}}>{hotel.city}</Text>
      <Text style ={{fontSize:30}}>{hotel.country}</Text>
      <Text style ={{fontSize:30}}>${hotel.rates_from}</Text>

      </View>

      <Text style={styles.subtitle}>Number of People:</Text>
      <View style={styles.stepperContainer}>
        <Button title="-" onPress={handleDecrement} />
        <Text style={styles.stepperValue}>{numberOfPeople}</Text>
        <Button title="+" onPress={handleIncrement} />
      </View>

      <Button title="Book Now" onPress={handleBookNow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight:5,
    paddingLeft:10,
    paddingTop:20,
    
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
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
  details:{
    fontSize:50,


  }
});

export default BookingScreen;
