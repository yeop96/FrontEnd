import React from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { mainColor, screenWidth, screenHeight } from 'common'
import DefaultButton from './DefaultButton'

/** 기초문진 가족력 화면 컴포넌트 */
export default function FamilyHistory(props: { scrollToNext: (infoKey: any, value: any) => void }) {
  const familyHistory = [
    '암',
    '뇌졸중',
    '심장병(심근경색/협심증)',
    '고혈압',
    '당뇨병',
    '이상지질혈증',
    '패결핵',
    '없음',
  ]

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: screenWidth,
        height: screenHeight,
        paddingTop: 29,
        alignItems: 'center',
        paddingHorizontal: 34,
      }}>
      <View style={{ alignItems: 'flex-start', width: 320 }}>
        <MaterialCommunityIcons name="account-multiple" color={mainColor} size={48} />
        <Text style={{ marginTop: 14, marginBottom: 64, fontSize: 30 }}>{'가족력이 있으신가요?'}</Text>
      </View>
      {familyHistory.map((item) => (
        <DefaultButton infoKey={'familyHistory'} scrollToNext={props.scrollToNext} label={item} key={item} />
      ))}
    </View>
  )
}
