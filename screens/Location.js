import {TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { getHotels } from '../services/apiservice';



const Location = () => {
  useEffect(() => {
    getLocation();

    fetchHotels();
    

  },[]);

  // state to hold location
  const [location, setLocation] = useState(false);
  const[hotels,setHotels] =useState([]);
  const hotel = [
    {
      "hotel_id": 1,
      "chain_id": 421,
      "chain_name": "Samed Resorts Group",
      "brand_id": 0,
      "brand_name": "",
      "hotel_name": "Sai Kaew Beach Resort",
      "hotel_formerly_name": "",
      "hotel_translated_name": "Sai Kaew Beach Resort",
      "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
      "addressline2": "",
      "zipcode": "21160",
      "city": "Koh Samet",
      "state": "Rayong",
      "country": "Thailand",
      "countryisocode": "TH",
      "star_rating": 4,
      "longitude": 101.466979,
      "latitude": 12.568135,
      "url": "https://www.agoda.com/partners/partnersearch.aspx?hid=1",
      "checkin": "2:00 PM",
      "checkout": "11:30 AM",
      "numberrooms": 160,
      "numberfloors": null,
      "yearopened": 2000,
      "yearrenovated": 2018,
      "photo1": "http://pix2.agoda.net/hotelimages/1/-1/0ff4876f93688b8adcbed487b5a2175d.jpg?s=312x",
      "photo2": "http://pix1.agoda.net/hotelimages/1/-1/d821f80943f96ebda33f5a019fa94df4.jpg?s=312x",
      "photo3": "http://pix4.agoda.net/hotelimages/1/-1/59241704e99027895aa6293d734c9fb1.jpg?s=312x",
      "photo4": "http://pix5.agoda.net/hotelimages/1/-1/fce5d70fac02fcb7aa25f31dd25850a8.jpg?s=312x",
      "photo5": "http://pix1.agoda.net/hotelimages/1/-1/7952a908de348304417552246f9039de.jpg?s=312x",
      "overview": "The 4-star Sai Kaew Beach Resort offers comfort and convenience whether you're on business or holiday in Koh Samet. The property features a wide range of facilities to make your stay a pleasant experience. Free Wi-Fi in all rooms, daily housekeeping, gift/souvenir shop, 24-hour front desk, Wi-Fi in public areas are just some of the facilities on offer. Some of the well-appointed guestrooms feature slippers, separate living room, television LCD/plasma screen, mirror, internet access – wireless. Take a break from a long day and make use of fitness center, sauna, outdoor pool, spa, massage. No matter what your reasons are for visiting Koh Samet, Sai Kaew Beach Resort will make you feel instantly at home.",
      "rates_from": 166,
      "continent_id": 2,
      "continent_name": "Asia",
      "city_id": 17222,
      "country_id": 106,
      "number_of_reviews": 3439,
      "rating_average": 8.2,
      "rates_currency": "USD"
    }]

  const fetchHotels = async () => {
    try {
      const hotelsData = await getHotels();
      setHotels(hotelsData);
      console.log("---------HOTELS CONSTANT----------")
      console.log(hotels);
    } catch (error) {
      setHotels(hotel)
      console.error('Error fetching hotels:', error);
    }
  };



  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setLocation(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    });
    console.log(location);
  };

  const renderMarkers = () => {
    if (hotels.length > 0) {
      return hotels.map((val, index) => (
        <Marker
          coordinate={{
            latitude: val.latitude,
            longitude: val.longitude,
          }}
          key={index}
          title={val.name} // Assuming your hotel objects have a "name" property
        />
      ));
    }
    return null;
  };

  const coords = {
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 100,
    longitudeDelta:100,
    title: 'My Location',
  };
  return (<View style ={styles.container}>
    
    <MapView initialRegion={coords} style={styles.map}
   
      zoomEnabled={true}
      // Enable pinch gestures for zooming
      pitchEnabled={true}
      // Enable rotation gestures for rotating the map
      rotateEnabled={true}>
      <Marker coordinate={coords} title={coords.title} />
      {renderMarkers()}

     
    </MapView>

    <TouchableOpacity style={styles.logoutButton} onPress={fetchHotels}>
          <Text style={styles.buttonText}>Show Hotels</Text>
    </TouchableOpacity>

    </View>



   


  );
};

export default Location;

const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  logoutButton: {
    backgroundColor:'#EA4335',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  

    
  },
});
