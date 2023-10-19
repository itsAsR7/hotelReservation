import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Rating from './Rating';

const ResuseTile = ({ item , onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Image
          source={{ uri: item.imageUrl }}
          width={80}
          height={80}
          borderRadius={12}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>{item.title}</Text>
          <Text style={{ fontSize: 14, color: 'gray', marginBottom: 8 }}>
            {item.location}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={{ marginRight: 5 }}>
              <Rating rating={item.rating}/>
            </View>
            <Text style={{color:'gray'}} >{` (${item.review}) `}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResuseTile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#efefef',
    borderRadius: 12,
  },
});
