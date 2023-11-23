import React, { useState } from 'react';
import { Image, View, Text, Button, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import { useStripe, CardField } from '@stripe/stripe-react-native';
import { db, auth } from '../dbConfig';
import { collection, addDoc } from 'firebase/firestore';

const windowWidth = Dimensions.get('window').width;

const BookingScreen = ({ route }) => {
  const { hotel } = route.params;
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const { confirmPayment } = useStripe();

  const handleBookNow = async () => {
    try {
      // Step 1: Perform the Stripe payment
      const { paymentIntent, error } = await confirmPayment('pk_test_A7jK4iCYHL045qgjjfzAfPxu', {
        type: 'Card',
        paymentMethodType: 'Card',
      });

      if (error) {
        console.error('Payment failed:', error);
        Alert.alert('Payment failed', 'Please try again.');
        return;
      }

      console.log('Payment succeeded:', paymentIntent);
      Alert.alert('Payment succeeded', 'Your booking is confirmed!');
    } catch (error) {
      console.error('Error during payment:', error);
      Alert.alert('Payment error', 'An error occurred during payment. Please try again.');
      return;
    }

    // Step 2: Save booking details to Firebase
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
      latitude: hotel.latitude,
      paymentStatus: 'paid', // Add a field to track payment status
    };

    try {
      const docRef = await addDoc(collection(db, 'Bookings'), bookingData);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      Alert.alert('Booking error', 'An error occurred while processing your booking.');
    }
  };

  const handleIncrement = () => {
    if (numberOfPeople <= 3) setNumberOfPeople((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople((prevCount) => prevCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: windowWidth - 20, height: 320, borderRadius: 24 }}
        source={{ uri: hotel.photo1 }}
      />

      <View style={styles.details}>
        <Text style={{ fontSize: 30 }}>{hotel.hotel_name}</Text>
        <Text style={{ fontSize: 30 }}>{hotel.city}</Text>
        <Text style={{ fontSize: 30 }}>{hotel.country}</Text>
        <Text style={{ fontSize: 30 }}>${hotel.rates_from}</Text>
      </View>

      <Text style={styles.subtitle}>Number of People:</Text>
      <View style={styles.stepperContainer}>
        <Button title="-" onPress={handleDecrement} />
        <Text style={styles.stepperValue}>{numberOfPeople}</Text>
        <Button title="+" onPress={handleIncrement} />
      </View>

      {Platform.OS === 'ios' && (
        <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        onCardChange={(cardDetails) => {
          // Handle card details change
          console.log(cardDetails);
        }}
      />
      )}

      <Button title="Book Now" onPress={handleBookNow} />
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
  details: {
    fontSize: 50,
  },
});

export default BookingScreen;
