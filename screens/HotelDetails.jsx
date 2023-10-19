import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HotelDetails = () => {
  return (
    <SafeAreaView style={styles.container} >
      <Text>HotelDetails</Text>
    </SafeAreaView>
  )
}

export default HotelDetails

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});