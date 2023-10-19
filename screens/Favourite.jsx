import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { FlatList } from 'react-native';
import ResuseTile from '../components/ResuseTile';
import HotelDetails from './HotelDetails';

const Favourite = ({ navigation }) => {
  const hotels = [
    {
      "hotel_id": 18,
      "chain_id": 0,
      "chain_name": "No chain",
      "brand_id": 0,
      "brand_name": "",
      "hotel_name": "Grand Coloane Resort",
      "hotel_formerly_name": "Grand Coloane Beach Resort",
      "hotel_translated_name": "Grand Coloane Resort",
      "addressline1": "1918 Estrada de Hac Sa",
      "addressline2": "",
      "zipcode": "",
      "city": "Macau",
      "state": "Macao",
      "country": "Macau",
      "countryisocode": "MO",
      "star_rating": 5,
      "longitude": 113.576574,
      "latitude": 22.125391,
      "url": "https://www.agoda.com/partners/partnersearch.aspx?hid=18",
      "checkin": "3:00 PM",
      "checkout": "12:00 PM",
      "numberrooms": 208,
      "numberfloors": 8,
      "yearopened": 1993,
      "yearrenovated": 2014,
      "photo1": "http://pix4.agoda.net/hotelimages/18/-1/91c5a3c5d5cc7189b0099fab9a2fbb64.jpg?s=312x",
      "photo2": "http://pix1.agoda.net/hotelimages/18/18/18_15060216180028256873.jpg?s=312x",
      "photo3": "http://pix4.agoda.net/hotelimages/18/18/18_121122143051695.jpg?s=312x",
      "photo4": "http://pix2.agoda.net/hotelimages/18/18/18_121122143052132.jpg?s=312x",
      "photo5": "http://pix2.agoda.net/hotelimages/18/18/18_121122143052678.jpg?s=312x",
      "overview": "Grand Coloane Resort is conveniently located in the popular Coloane area. The hotel offers a wide range of amenities and perks to ensure you have a great time. Take advantage of the hotel's 24-hour room service, daily housekeeping, free Wi-Fi in all rooms, taxi service, 24-hour security. Designed for comfort, selected guestrooms offer television LCD/plasma screen, additional toilet, bathroom phone, carpeting, clothes rack to ensure a restful night. Entertain the hotel's recreational facilities, including hot tub, fitness center, sauna, golf course (on site), outdoor pool. Grand Coloane Resort is an excellent choice from which to explore Macau or to simply relax and rejuvenate.",
      "rates_from": 125,
      "continent_id": 2,
      "continent_name": "Asia",
      "city_id": 21397,
      "country_id": 169,
      "number_of_reviews": 3657,
      "rating_average": 8,
      "rates_currency": "USD"
    },
    {
      "hotel_id": 25,
      "chain_id": 2688,
      "chain_name": "Skycity",
      "brand_id": 3990,
      "brand_name": "Skycity",
      "hotel_name": "SKYCITY Hotel",
      "hotel_formerly_name": "",
      "hotel_translated_name": "SKYCITY Hotel",
      "addressline1": "Corner Victoria & Federal Streets",
      "addressline2": "",
      "zipcode": "1010",
      "city": "Auckland",
      "state": "Auckland",
      "country": "New Zealand",
      "countryisocode": "NZ",
      "star_rating": 4.5,
      "longitude": 174.761966,
      "latitude": -36.848387,
      "url": "https://www.agoda.com/partners/partnersearch.aspx?hid=25",
      "checkin": "3:00 PM",
      "checkout": "11:00 AM",
      "numberrooms": 323,
      "numberfloors": 8,
      "yearopened": 1996,
      "yearrenovated": null,
      "photo1": "http://pix3.agoda.net/hotelimages/25/-1/8dad037385fd554a85e013f931a8a1d5.jpg?s=312x",
      "photo2": "http://pix2.agoda.net/hotelimages/25/25/25_15062308450030331242.jpg?s=312x",
      "photo3": "http://pix5.agoda.net/hotelimages/25/25/25_15062308460030331423.jpg?s=312x",
      "photo4": "http://pix2.agoda.net/hotelimages/25/25/25_15062308460030331424.jpg?s=312x",
      "photo5": "http://pix2.agoda.net/hotelimages/25/25/25_15062308460030331425.jpg?s=312x",
      "overview": "Skycity Hotel is perfectly located for both business and leisure guests in Auckland. Offering a variety of facilities and services, the hotel provides all you need for a good night's sleep. To be found at the hotel are 24-hour room service, free Wi-Fi in all rooms, wheelchair accessible, casino, 24-hour front desk. Guestrooms are fitted with all the amenities you need for a good night's sleep. In some of the rooms, guests can find television LCD/plasma screen, carpeting, complimentary instant coffee, complimentary tea, mirror. The hotel's peaceful atmosphere extends to its recreational facilities which include fitness center, spa, massage. A welcoming atmosphere and excellent service are what you can expect during your stay at Skycity Hotel.",
      "rates_from": 117,
      "continent_id": 7,
      "continent_name": "Pacific Ocean and Australia",
      "city_id": 3750,
      "country_id": 25,
      "number_of_reviews": 1425,
      "rating_average": 8.5,
      "rates_currency": "USD"
    },
    {
      "hotel_id": 33,
      "chain_id": 3,
      "chain_name": "Accor Hotels",
      "brand_id": 36,
      "brand_name": "Pullman",
      "hotel_name": "Pullman Bordeaux Lac",
      "hotel_formerly_name": "Sofitel Bordeaux Aquitania Hotel",
      "hotel_translated_name": "Pullman Bordeaux Lac",
      "addressline1": "Avenue Jean Gabriel Domergue",
      "addressline2": "",
      "zipcode": "33300",
      "city": "Bordeaux",
      "state": "Aquitaine",
      "country": "France",
      "countryisocode": "FR",
      "star_rating": 4,
      "longitude": -0.565954,
      "latitude": 44.889622,
      "url": "https://www.agoda.com/partners/partnersearch.aspx?hid=33",
      "checkin": "2:00 PM",
      "checkout": "12:00 PM",
      "numberrooms": null,
      "numberfloors": null,
      "yearopened": null,
      "yearrenovated": null,
      "photo1": "http://pix3.agoda.net/hotelimages/6584938/0/dc16bcf0fcfe7d2d5110462ebed1705b.jpg?s=312x",
      "photo2": "http://pix3.agoda.net/hotelimages/33/33/33_15022714410025654631.jpg?s=312x",
      "photo3": "http://pix4.agoda.net/hotelimages/33/33/33_17080709240054945185.jpg?s=312x",
      "photo4": "http://pix5.agoda.net/hotelimages/33/33/33_17080709240054945186.jpg?s=312x",
      "photo5": "http://pix3.agoda.net/hotelimages/33/33/33_17080709240054945187.jpg?s=312x",
      "overview": "Located in Le Lac, Pullman Bordeaux Lac is a perfect starting point from which to explore Bordeaux. Offering a variety of facilities and services, the hotel provides all you need for a good night's sleep. Casino, 24-hour front desk, facilities for disabled guests, luggage storage, Wi-Fi in public areas are just some of the facilities on offer. Each guestroom is elegantly furnished and equipped with handy amenities. To enhance guests' stay, the hotel offers recreational facilities such as fitness center, golf course (within 3 km), outdoor pool, massage, solarium. Pullman Bordeaux Lac is an excellent choice from which to explore Bordeaux or to simply relax and rejuvenate.",
      "rates_from": 136,
      "continent_id": 4,
      "continent_name": "Europe",
      "city_id": 12838,
      "country_id": 153,
      "number_of_reviews": 21,
      "rating_average": 8.2,
      "rates_currency": "USD"
    },
  ];

  const renderItem = ({ item }) => (
    <Pressable onPress={() => onListItemPressed(item)}>
      <View style={styles.hotelCard}>
        <Image source={{uri: item.photo1}} style={styles.hotelImage} />
        <Text style={styles.hotelName}>{item.hotel_name}</Text>
        <Text style={styles.hotelLocation}>{item.city}, {item.country}</Text>
      </View>
    </Pressable>
  );

  const onListItemPressed = (hotel) => {
    navigation.navigate('HotelDetails', { hotel: hotel });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={hotels}
        renderItem={renderItem}
        keyExtractor={item => item.hotel_id}
      />
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  hotelCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hotelImage: {
    width: '100%',
    height: 120,
  },
  cardDetails: {
    padding: 10,
  },
  hotelName: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Arial',
    lineHeight: 24, // Adjust the line height as per your preference
  },
  hotelLocation: {
    paddingHorizontal: 4,
    marginBottom: 4,
    color: '#666',
    fontFamily: 'Arial',
    lineHeight: 18, // Adjust the line height as per your preference
  },
  ratingContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18, // Adjust the line height as per your preference
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
