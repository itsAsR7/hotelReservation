import { Alert } from 'react-native'
import React from 'react'

const ReusableAlert = ({heading, message, btnOne, btnTwo, fctOne, fctTwo}) => {
  return (
    Alert.alert(heading, message, [
        {
          text: btnOne,
          onPress: () => {fctOne},
        },
        {
          text: btnTwo,
          onPress: () => {fctTwo},
        },
        { defaultIndex: 1 },
      ])
  )
}

export default ReusableAlert