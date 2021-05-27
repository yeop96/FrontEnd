import * as React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { mainColor } from 'common'

const questionnairekey = ['흡연', '음주', '운동', '병력', '가족력']

/** 가짜 기초문진내역, 필요시 인덱스별로 가져다 쓰도록 함 */
const tempBasicQuestionnaire = [
  ['피우지 않습니다', '일주일에 두 번', '일주일에 한 번', '당뇨병', '암'],
  ['일주일에 한 갑', '마시지 않습니다.', '일주일에 두 번', '없음', '암'],
  ['일주일에 두 갑', '마시지 않습니다.', '일주일에 두 번', '없음', '암'],
]

/** 초진내역 */
export default function Diagnosis({ route }) {
  let isAllLightDiease = true
  route.params.diagnosis.disease.map((diseaseInfo) => {
    if (diseaseInfo.level !== '경증 질환') {
      isAllLightDiease = false
    }
  })

  return (
    <ScrollView style={style.container}>
      <Text style={style.textTitle}>{route.params.diagnosis.date}</Text>
      <Text style={style.textSemiTitle}>예상 질병(증상 유사도 분석)</Text>
      {isAllLightDiease && (
        <Text style={{ fontSize: 14, color: mainColor, width: 320, marginBottom: 12 }}>
          {'Tip! 경증 질병일 확률이 높습니다.\n지역응급의료기관 방문을 추천합니다.'}
        </Text>
      )}
      {route.params.diagnosis.disease.map((diseaseInfo, index) => (
        <View style={[style.item, { marginBottom: 10 }]} key={index}>
          <View style={{ flexDirection: 'column', marginLeft: 4 }}>
            <Text style={[style.itemName, { marginBottom: 6 }]}>{diseaseInfo.name + ' - ' + diseaseInfo.level}</Text>
            <Text style={style.itemMessage}>{diseaseInfo.description}</Text>
          </View>
        </View>
      ))}
      <Text style={[style.textSemiTitle, { marginTop: 18 }]}>증상</Text>
      <View style={[style.item, { flexDirection: 'column', alignItems: 'flex-start' }]}>
        {route.params.diagnosis.symptom.map((symptomInfo, index) => {
          return (
            <View key={index}>
              <Text style={style.itemName}>{symptomInfo}</Text>
              {index < route.params.diagnosis.symptom.length - 1 && (
                <View style={{ width: 320, marginVertical: 14, height: 2, backgroundColor: '#f2f2f2f2' }} />
              )}
            </View>
          )
        })}
      </View>
      <Text style={[style.textSemiTitle, { marginTop: 18 }]}>기초문진</Text>
      <View style={[style.item, { flexDirection: 'column', alignItems: 'flex-start' }]}>
        {tempBasicQuestionnaire[route.params.index].map((questionnaire, index) => {
          return (
            <View key={index}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 320 }}>
                <Text style={[style.itemName, { color: '#666666' }]}>{questionnairekey[index]}</Text>
                <Text style={[style.itemName, { color: '#333333' }]}>{questionnaire}</Text>
              </View>
              {index < 4 && (
                <View style={{ width: 320, marginVertical: 14, height: 2, backgroundColor: '#f2f2f2f2' }} />
              )}
            </View>
          )
        })}
      </View>
      <View style={[style.item, { flexDirection: 'column', alignItems: 'flex-start' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 320 }}>
          <Text style={[style.itemName, { color: '#666666' }]}>복용중인 약</Text>
          <Text style={[style.itemName, { color: '#333333' }]}>{route.params.diagnosis.medicationBeingTaken}</Text>
        </View>
      </View>

      {/* 병원 지도 넣을 자리*/}
      {/** 바텀텝에 가려지지 않도록 띄워주는 빈 공간 */}
      <View style={{ height: 60 }} />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#f3f3f3' },
  item: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
  },
  itemMessage: {
    fontSize: 14,
    color: '#555555',
  },
  textTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSemiTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 24,
  },
})
