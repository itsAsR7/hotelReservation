import React, { useState, useEffect } from 'react';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import OnboardingScreen from '../components/OnboardingScreen';
import HotelsList from '../components/HotelsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db, storageRef, storage,ref,getDownloadURL } from '../dbConfig';
import {

  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { updateDoc} from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import {uploadBytes, getStorage,list } from 'firebase/storage'


import * as CryptoJS from 'crypto-js';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';




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

const ProfileScreen = ({ navigation }) => {
  const [BookingsForUI, setBookingsForUI] = useState([]);
  const [image, setImage] = useState(null);
  const [uri, setUri] = useState(null);
  const[url,setUrl] =useState();

  // const { userId } = auth.currentUser.uid; // Correct
  // Assuming you pass the userId as a parameter

  // const userIdHash = CryptoJS.SHA256(userId).toString(CryptoJS.enc.Hex);

  const userIdHash = auth.currentUser.uid;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const uri = result.assets[0].uri;
      console.log("********URI*********")
      console.log(uri)

      uploadImage(uri)
      setUri(uri)







    }
  }





  const uploadImage = async (uri) => {
    try {

      const mountainImagesRef = ref(storage, `images/${auth.currentUser.uid}.jpg`)

      const response = await fetch(uri);
      const blob = await response.blob();
      uploadBytes(mountainImagesRef, blob).then((snapshot) => {
        console.log(snapshot.metadata)
        console.log("Uploaded blob or file!")

      });
      console.log(`hello ${name} here.`)
      const downloadUrl = await getDownloadURL(mountainImagesRef);
      setImage(downloadUrl)
    } catch (error) {
      console.log("Error uploading image", error)

    }


  };

  const loadUserData = async () => {
    try {
      console.log(userIdHash)
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

 


  

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen was focused');
      // Do something when the screen is focused

      loadUserData();
      getUserProfile();
      loadImageFromStorage();
     
      
      
      return () => {
        console.log('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions

      };
    }, [])
  );


  const loadImageFromStorage = async () =>{

    const storage = getStorage();
    const reference =ref(storage,`images/${auth.currentUser.uid}.jpg`)
    await getDownloadURL(reference).then((x)=>{

      setImage(x);
      console.log("X:",x)



    })
  }





  useEffect(() => {




    console.log(
      'Screen has loaded, attempting to get user profile for Profile.js'
    );

    if (userIdHash) {
      loadUserData();
    }

    loadImageFromStorage();

    getUserProfile();
  }, [userIdHash]);

  const getUserProfile = async () => {
    const q = query(
      collection(db, 'Bookings'),
      where('id', '==', auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    setBookingsForUI(querySnapshot.data);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });

    const bookingsData = [];
    querySnapshot.forEach((doc) => {
      bookingsData.push({ id: doc.id, ...doc.data() });
    });

    setBookingsForUI(bookingsData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={image === null ? require("../assets/profile.jpg") : { uri: image}} style={styles.profileImage} />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <Text style={styles.username}>{name}</Text>
        <Text style={styles.username}>{auth.currentUser.email}</Text>
        <Text style={styles.email}>Age:{age}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('User Information')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => uploadImage(uri)}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container1}>
        <Text style={{ fontSize: 22 }}>Bookings</Text>

        <FlatList
          data={BookingsForUI}
          ItemSeparatorComponent={
            // ItemSeparatorComponent is used to draw a "line" between each row
            () => {
              return (
                <View
                  style={{
                    marginLeft: 0,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    marginVertical: 5,
                  }}
                />
              );
            }
          }
          keyExtractor={(item) => item.hotelID}
          renderItem={({ item }) => (
            <View style={styles.bookingItem}>
              <Image source={{ uri: item.image }} style={styles.renterPhoto} />

              <View style={styles.bookingInfo}>
                <Text>{item.country}</Text>
                <Text>{item.hotelName}</Text>
                <Text>{item.city}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 100,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
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

  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  editButton: {
    backgroundColor: '#a7f7a1',
    padding: 10,
    borderRadius: 15,
    margin: 10,
    marginTop: 0
  },
  logoutButton: {
    backgroundColor: '#fc9558',
    padding: 10,
    borderRadius: 15,
    margin: 10,
    marginTop: 0
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
  },
  container1: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    marginLeft: 20,
    marginRight: 20,
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  renterPhoto: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
  bookingInfo: {
    flexDirection: 'column',
    alignItems: 'left',
    marginVertical: 10,
    width: 200,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    marginBottom: 100, // Adjust the value as needed
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  button: {

    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 3,
    alignItems: 'center',
    width: 200



  },

});

export default ProfileScreen;
