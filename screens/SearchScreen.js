import React,{useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import HotelsList from '../components/HotelsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from './Search';
import { auth } from '../dbConfig';
import * as CryptoJS from 'crypto-js';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {

  // const { userId } = auth.currentUser.email; // Correct
  // Assuming you pass the userId as a parameter

  // const userIdHash = CryptoJS.SHA256(userId).toString(CryptoJS.enc.Hex);
  const userIdHash = auth.currentUser.uid; 

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen was focused');
      // Do something when the screen is focused

      loadUserData();
      return () => {
        console.log('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
     
      };
    }, [])
  );





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

  return (
    <SafeAreaView style={{ flex: 1, margin: 15 }}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable
          onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons
              name="account-circle"
              size={43}
              color="navy"
              />
              </Pressable>
          <Text style={{ fontSize: 25, fontWeight: '500',color:'navy' }}>Welcome,{name}
          !</Text>
         
          

          <TouchableOpacity onPress={() => navigation.navigate('HotelList')}>
            <FontAwesome name="search" size={30} color="navy" />
          </TouchableOpacity>

          
        </View>
        
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: '500',color:'navy' }}>{auth.currentUser.email}</Text>

        <Text style={{ marginTop: 15, fontSize: 22 }}>
       
        </Text>
        


         
        </View>
      </View>

      <HotelsList />
    </SafeAreaView>
  );
};

export default SearchScreen;
