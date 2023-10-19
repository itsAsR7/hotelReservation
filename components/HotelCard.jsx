import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const HotelCard = ({ item, margin, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card(margin)}>
        <View style={styles.imgcon}>
          <Image
            source={{ uri: item.photo1 }}
            width={150}
            height={120}
            borderRadius={16}
          />
        </View>
        <View style={{alignItems:'flex-start',marginStart:20, marginTop:20}} >
          <Text>{item.hotel_name}</Text>
          <Text>{item.city}</Text>
          <Text>{item.country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  card: (margin) => ({
    width: 180,
    height: 230,
    borderRadius: 16,
    backgroundColor: '#fefefe',
    marginRight: margin,
  }),
  imgcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
