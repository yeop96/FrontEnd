import React from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { mainColor, screenWidth, screenHeight } from 'common'
import DefaultButton from './DefaultButton'

/** 기초문진 기존 병력 화면 컴포넌트 */
export default function MedicalHistory(props: { scrollToNext: (infoKey: any, value: any) => void }) {
  const medicalHistory = ['암', '뇌졸중', '심근경색', '고혈압', '당뇨병', '없음']

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: screenWidth,
        height: screenHeight,
        paddingTop: 29,
        paddingHorizontal: 34,
      }}>
      <MaterialCommunityIcons name="hospital-box-outline" color={mainColor} size={48} />
      <Text style={{ marginTop: 14, marginBottom: 64, fontSize: 30 }}>{'이전에 진단받은 병이\n있으신가요?'}</Text>
      {medicalHistory.map((item) => (
        <DefaultButton infoKey={'medicalHistory'} scrollToNext={props.scrollToNext} label={item} key={item} />
      ))}
    </View>
  )
}
