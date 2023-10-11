import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReviewTle from '../Tiles/Reviews/ReviewTle'

const ReviewsList = ({reviews}) => {
  return (
    <FlatList 
        data={reviews}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=> item._id}
        renderItem={({item})=> (
            <View style={{marginBottom: 10}}>
                <ReviewTle review={item}/>
            </View>
        )}
    />
  )
}

export default ReviewsList

const styles = StyleSheet.create({})