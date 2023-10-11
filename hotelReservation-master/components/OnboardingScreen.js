import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/HotelAppLogo.png')}
      />
      <Text style={styles.heading}>My Hotel App</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={[styles.buttonText, styles.buttonTextLogin]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignup} onPress={handleSignup}>
          <Text style={[styles.buttonText, styles.buttonTextSignup]}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Background color
  },
  heading: {
    fontSize: 24,
    marginBottom: 30,
    marginTop:30
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonLogin: {
    backgroundColor: '#000', // Black button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonSignup: {
    backgroundColor: '#fff', // White button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonTextLogin: {
    color: '#fff', // Text color for Login button
  },
  buttonTextSignup: {
    color: '#000', // Text color for Signup button
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius:100
  },
});

export default OnboardingScreen;
