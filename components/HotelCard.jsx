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
            width={210}
            height={140}
            borderRadius={16}
          />
        </View>
        <View style={{alignItems:'flex-start',marginStart:20, marginTop:10,marginRight:20}} >
          <Text style ={{fontSize:22,fontWeight:'bold'}}>{item.hotel_name}</Text>
          <Text style ={{fontSize:20,color:'white'}}>{item.city}</Text>
          <Text style ={{fontSize:18,color:'red'}}>{item.country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  card: (margin) => ({
    width: 250,
    height: 330,
    borderRadius: 16,
    backgroundColor: '#cfcfcf',
    marginRight: margin,
  }),
  imgcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
