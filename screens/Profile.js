import React,{useState,useEffect} from 'react';
import { KeyboardAvoidingView,ScrollView,FlatList,View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import OnboardingScreen from '../components/OnboardingScreen';
import HotelsList from '../components/HotelsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth,db } from '../dbConfig';
import { getDoc, doc,collection, query, where, getDocs } from "firebase/firestore";





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

  const [BookingsForUI, setBookingsForUI] = useState([]);

  useEffect(()=>{
    console.log("Screen has loaded, attempting to get user profile for Profile.js")
    
    
    getUserProfile()
    
    },[])

  const getUserProfile = async () => {

    const q = query(collection(db, "Bookings"), where("id", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    setBookingsForUI(querySnapshot.data)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    const bookingsData = [];
    querySnapshot.forEach((doc) => {
      bookingsData.push({ id: doc.id, ...doc.data() });
    });

    setBookingsForUI(bookingsData);
  
  
  }



      




  return (
 

    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{auth.currentUser.email}</Text>
        <Text style={styles.email}>{auth.currentUser.uid}</Text>
      </View>
       <View style={styles.buttonContainer} onPress={getUserProfile}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Reload Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        
      </View>
  
      <View style={styles.container1}>
        <Text style={{fontSize:20}}>Bookings</Text>
        

      <FlatList
          data={BookingsForUI}

          ItemSeparatorComponent={
            // ItemSeparatorComponent is used to draw a "line" between each row
            () => {
              return (
                <View
                  style={{ marginLeft: 0, borderWidth: 1, borderColor: "#ccc", marginVertical: 5 }}
                />
              )
            }}
  

          keyExtractor={(item) => item.hotelID}

          renderItem={({ item }) => (

             <View style={styles.bookingItem}>
            <Image source={{ uri: item.image}} style={styles.renterPhoto} />
            
            
             
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
    marginBottom:100
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
    marginTop:0,
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
  container1: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    marginLeft:20,
    marginRight:20
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
    resizeMode:'contain',
  },
  bookingInfo: {
    flexDirection: 'column',
    alignItems: 'left',
    marginVertical: 10,
    width:200
  
    
    
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




});

export default ProfileScreen
