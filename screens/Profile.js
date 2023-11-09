import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import OnboardingScreen from '../components/OnboardingScreen';
import HotelsList from '../components/HotelsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../dbConfig';


const handleLogout = async () => {
  try {
    await auth.signOut();
    navigation.navigate('Onboarding');
  } catch (err) {
    console.error(
      `Error when signing user (uid: ${auth.currentUser.uid}) out: ${err}`
    );
  }
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
          aliquam justo. Proin id convallis justo.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  bioContainer: {
    paddingHorizontal: 20,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen
