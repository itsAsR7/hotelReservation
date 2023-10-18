import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';

import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');

// import Slides from './Slides'

const OnboardingScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const hotelImages = [
    {
      id: 1,
      image: require('../assets/hotel-2.jpg'),
      title: 'Find the perfect place to stay',
    },
    {
      id: 2,
      image: require('../assets/hotel-3.jpg'),
      title: 'Find the perfect place to stay',
    },
    {
      id: 3,
      image: require('../assets/hotel-1.jpg'),
      title: 'Find the perfect place to stay',
    },
  ];

  return (
    <View style={styles.wrappercontainer}>
      <FlatList
        pagingEnabled
        horizontal
        showHorizontalScrollIndicator={false}
        data={hotelImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Slides item={item} />}
      />
      <View style={styles.stackContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/HotelAppLogo.png')}
        />
        {/* <Text style={styles.heading}>QuickStay</Text> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
            <Text style={[styles.buttonText, styles.buttonTextLogin]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSignup} onPress={handleSignup}>
            <Text style={[styles.buttonText, styles.buttonTextSignup]}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const Slides = ({ item }) => {
  return (
    <View style={styles.mainContainer}>
      <Image source={item.image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 30,
    marginTop: 30,
  },
  image: {
    resizeMode: 'cover',
    width: width,
    height: height,
  },
  wrappercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackContainer: {
    position: 'absolute',
    top: 70,

    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
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
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8', // Background color
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 30,
//     marginTop: 30,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//   },
//   buttonLogin: {
//     backgroundColor: '#000', // Black button
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   buttonSignup: {
//     backgroundColor: '#fff', // White button
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 18,
//   },
//   buttonTextLogin: {
//     color: '#fff', // Text color for Login button
//   },
//   buttonTextSignup: {
//     color: '#000', // Text color for Signup button
//   },
//   logo: {
//     height: 200,
//     width: 200,
//     borderRadius: 100,
//   },
// });

export default OnboardingScreen;
