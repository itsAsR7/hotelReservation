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

const HotelDetails = ({ route, navigation }) => {

  const { hotel } = route.params;

  console.log(hotel)

  return (
    <ScrollView>
      <View style={{ height: 100 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          titleText={hotel.hotel_name}
          icon={'search'}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Bottom')}
        />
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: hotel.photo1 }}
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
              {hotel.hotel_name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {hotel.city}
            </Text>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}
            >
              <Rating
                maxStars={5}
                stars={hotel.star_rating}
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
                {` (${hotel.number_of_reviews})`}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 25, paddingTop: 90 }}>
          <Text style={{ fontSize: 22, marginBottom: 10 }}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={8}
            value={hotel.overview}
          />
        </View>

        <View
          style={[
            { flexDirection: 'row', justifyContent: 'space-between' },
            styles.bottom,
          ]}
        >
          <View>
            <Text style={{ fontSize: 24 }}>{`\$ ${hotel.rates_from}`}</Text>
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