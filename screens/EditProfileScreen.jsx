import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../dbConfig';
import * as CryptoJS from 'crypto-js';

const EditProfileScreen = ({ route, navigation }) => {
  const { userId } = auth.currentUser.email; // Correct
  // Assuming you pass the userId as a parameter

  const userIdHash = CryptoJS.SHA256(userId).toString(CryptoJS.enc.Hex);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');

  useEffect(() => {
    // Load existing user data if in edit mode
    if (userIdHash) {
      loadUserData();
    }
  }, [userIdHash]);

  const loadUserData = async () => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userIdHash);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setName(userData.name || '');
        setAddress(userData.address || '');
        setAge(userData.age || '');
        setProfession(userData.profession || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSaveProfile = async () => {
    // Validate input fields
    if (!name || !address || !age || !profession) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }
  
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userIdHash);
  
      // Load existing user data if in edit mode
      let existingUserData = {};
    
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          existingUserData = userDocSnap.data();
        }
     
  
      const userData = {
        name: name || (existingUserData.name !== undefined ? existingUserData.name : ''),
        address: address || (existingUserData.address !== undefined ? existingUserData.address : ''),
        age: age || (existingUserData.age !== undefined ? existingUserData.age : ''),
        profession: profession || (existingUserData.profession !== undefined ? existingUserData.profession : ''),
      };
  
      // Save or update user data in Firestore
      await setDoc(userDocRef, userData);
  
      Alert.alert('Success', 'Profile saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving user data:', error);
  
      // Log the detailed error information
      if (error.code) {
        console.error('Firestore Error Code:', error.code);
      }
      if (error.message) {
        console.error('Firestore Error Message:', error.message);
      }
  
      Alert.alert('Error', 'Failed to save profile');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        fontSize={20}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        fontSize={20}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
        fontSize={20}
      />
      <TextInput
        style={styles.input}
        placeholder="Profession"
        value={profession}
        onChangeText={(text) => setProfession(text)}
        fontSize={20}
      />
      <TouchableOpacity style ={styles.button}title="Save Profile" onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the input background opacity as needed
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop:20,
    
    
  },
  button: {
   
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 15,
    marginTop:20,
    alignItems:'center',
    
 
    
  },

  buttonText: {
    color: 'white',
    fontSize: 30,
    
  },
});

export default EditProfileScreen;
