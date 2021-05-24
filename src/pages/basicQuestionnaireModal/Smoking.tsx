import React from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { mainColor, screenWidth, screenHeight } from 'common'
import DefaultButton from './DefaultButton'

/** 기초문진 흡연 화면 컴포넌트 */
export default function Smoking(props: { scrollToNext: (infoKey: any, value: any) => void }) {
  const smoking = [
    '피우지 않습니다',
    '일주일에 한 갑',
    '일주일에 두 갑',
    '일주일에 세 갑',
    '일주일에 네 갑',
    '일주일에 다섯 갑 이상',
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
        <MaterialCommunityIcons name="smoking" color={mainColor} size={48} />
        <Text style={{ marginTop: 17, marginBottom: 64, fontSize: 30 }}>{'흡연을 하시나요?'}</Text>
      </View>
      {smoking.map((item) => (
        <DefaultButton infoKey={'smoking'} scrollToNext={props.scrollToNext} label={item} key={item} />
      ))}
    </View>
  )
}
