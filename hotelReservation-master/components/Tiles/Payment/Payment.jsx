import { View, Switch } from 'react-native'
import React, {useState} from 'react'
import AssetImage from '../../Reusable/AssetImage'
import reusable from '../../Reusable/reusable.styles'
import TextComponent from '../../Reusable/TextComponent'
import { COLORS, TEXT } from '../../../constants/theme'

const Payment = ({title, image}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View
    style={[
      reusable.reusableRow("space-between"),
      { backgroundColor: COLORS.lightWhite, height: 60, borderRadius: 12 },
    ]}
    onPress={() => {}}
  >
    <AssetImage
      data={image}
      height={50}
      width={50}
    />

    <TextComponent
      text={title}
      family={"regular"}
      size={TEXT.xLarge - 5}
      color={COLORS.black}
    />

    <Switch
      trackColor={{ false: COLORS.lightGrey, true: COLORS.lightGrey }}
      thumbColor={isEnabled ? COLORS.blue : COLORS.lightBlue}
      ios_backgroundColor={COLORS.gray}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  </View>

  )
}

export default Payment