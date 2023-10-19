import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Rating = ({ rating }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <MaterialCommunityIcons name="star" size={20} color={'#e76f51'} />
      <Text style={{ marginLeft: 5, color: '#e76f51', fontSize: 14 }}>
        {rating}
      </Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
