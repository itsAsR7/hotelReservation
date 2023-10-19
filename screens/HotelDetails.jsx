import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { ScrollView } from 'react-native';
import { Rating } from 'react-native-stock-star-rating';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HotelDetails = ({ navigation }) => {
  const hotel = {
    availability: {
      start: '2023-08-20T00:00:00.000Z',
      end: '2023-08-25T00:00:00.000Z',
    },
    _id: '64c675793cfa5e847bcd5436',
    country_id: '64c62bfc65af9f8c969a8d04',
    title: 'Hotel Midtown Toronto',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris sit amet massa vitae tortor condimentum lacinia quis. Elit ut aliquam purus sit amet luctus. Nunc mi ipsum faucibus vitae aliquet. Et magnis dis parturient montes nascetur ridiculus mus mauris. Vel fringilla est ullamcorper eget nulla facilisi.',
    contact: '64c5d95adc7efae2a45ec376',
    imageUrl:
      'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
    review: '6523 Reviews',
    location: 'Toronto, ON',
    latitude: 37.7749,
    longitude: -122.4194,
    price: 650,
    facilities: [
      {
        wifi: true,
        _id: '64c675793cfa5e847bcd5437',
      },
    ],
    __v: 0,
  };

  return (
    <ScrollView>
      <View style={{ height: 100 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          titleText={hotel.title}
          icon={'search'}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Bottom')}
        />
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: hotel.imageUrl }}
          width={windowWidth - 20}
          height={220}
          borderRadius={24}
        />
        <View style={styles.titleContainer}>
          <View style={styles.titleColumn}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: '600',
              }}
            >
              {hotel.title}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {hotel.location}
            </Text>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}
            >
              <Rating
                maxStars={5}
                stars={hotel.rating}
                bordered={false}
                color={'#fd9942'}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',

                  color: 'grey',
                }}
              >
                {` (${hotel.review})`}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 25, paddingTop: 90 }}>
          <Text style={{ fontSize: 22, marginBottom: 10 }}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={8}
            value={hotel.description}
          />
        </View>

        <View
          style={[
            { flexDirection: 'row', justifyContent: 'space-between' },
            styles.bottom,
          ]}
        >
          <View>
            <Text style={{ fontSize: 24 }}>{`\$ ${hotel.price}`}</Text>
            <Text style={{ fontSize: 16, color:'gray' }}>Jan 01- Feb 12</Text>
          </View>
          <View>
            <TouchableOpacity onPress={()=>{}} style={styles.btn} >
            <Text style={{fontWeight:'600'}} >Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#efefef',
    height: windowHeight,
    alignItems: 'center',
  },
  titleContainer: {
    margin: 5,
    backgroundColor: '#fff',
    height: 120,
    position: 'absolute',
    top: 190,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  titleColumn: {
    padding: 15,
  },
  bottom: {
    marginTop:20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 90,
    width:windowWidth - 20,
   
    paddingVertical: 20,
  },
  btn:{
    width:(windowWidth - 40)/2.2,
    backgroundColor:'green',
    color:'#fff',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderRadius:10
  }
});
