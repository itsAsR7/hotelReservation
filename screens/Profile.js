import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import firebase from '@react-native-firebase/app';
import { db } from '../dbConfig';


""
  const handleLogout = async () => {
    try {
      db()
      .signOut()
      .then(() => console.log('User signed out!'));
      navigation.navigate('LoginScreen');
      // You can navigate to the login screen or perform other actions here.
    } catch (error) {
      console.error('Sign-out error', error);
    }
  
  }



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
