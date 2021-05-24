import React from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { mainColor, screenWidth, screenHeight } from 'common'
import DefaultButton from './DefaultButton'

/** 기초문진 음주 화면 컴포넌트 */
export default function Drink(props: { scrollToNext: (infoKey: any, value: any) => void }) {
  const drink = [
    '마시지 않습니다.',
    '일주일에 한 번',
    '일주일에 두 번',
    '일주일에 세 번',
    '일주일에 네 번',
    '일주일에 다섯 번',
    '일주일에 여섯 번',
    '매일',
  ]

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: screenWidth,
        height: screenHeight,
        paddingTop: 29,
        paddingHorizontal: 34,
        alignItems: 'center',
      }}>
      <View style={{ alignItems: 'flex-start', width: 320 }}>
        <MaterialCommunityIcons name="glass-cocktail" color={mainColor} size={48} />
        <Text style={{ marginTop: 14, marginBottom: 64, fontSize: 30 }}>{'술을 드시나요?'}</Text>
      </View>
      {drink.map((item) => (
        <DefaultButton infoKey={'drink'} scrollToNext={props.scrollToNext} label={item} key={item} />
      ))}
    </View>
  )
}
