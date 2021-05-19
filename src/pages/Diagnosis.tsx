import * as React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'

/** 초진내역 */
export default function Diagnosis({ navigation, route }) {
  return (
    <ScrollView style={style.container}>
      <Text style={style.textTitle}>{format(route.params.date, 'yyyy.MM.dd')}</Text>
      <Text style={style.textSemiTitle}>예상 질병</Text>
      {route.params.disease.map((diseaseInfo, index) => (
        <View style={[style.item, { marginBottom: 10 }]} key={index}>
          <View style={{ flexDirection: 'column', marginLeft: 4 }}>
            <Text style={[style.itemName, { marginBottom: 6 }]}>{diseaseInfo.name}</Text>
            <Text style={style.itemMessage}>{diseaseInfo.description}</Text>
          </View>
        </View>
      ))}
      <Text style={[style.textSemiTitle, { marginTop: 18 }]}>증상</Text>
      <View style={[style.item, { flexDirection: 'column', alignItems: 'flex-start' }]}>
        {route.params.symptom.map((symptomInfo, index) => {
          return (
            <View key={index}>
              <Text style={style.itemName}>{symptomInfo}</Text>
              {index < route.params.symptom.length - 1 && (
                <View style={{ width: 320, marginVertical: 14, height: 2, backgroundColor: '#f2f2f2f2' }} />
              )}
            </View>
          )
        })}
      </View>
      <Text style={[style.textSemiTitle, { marginTop: 18 }]}>예상 진료과</Text>
      {route.params.department.map((departmentInfo, index) => (
        <TouchableOpacity style={[style.item, { flexDirection: 'column', alignItems: 'flex-start' }]}>
          <Text style={[style.itemMessage, { marginBottom: 8 }]}>진료과명</Text>
          <Text style={style.itemName}>{departmentInfo.name}</Text>
          <View style={{ width: 320, marginVertical: 14, height: 2, backgroundColor: '#f2f2f2f2' }} />
          <Text style={[style.itemMessage, { marginBottom: 8 }]}>추천 병원</Text>
          <Text style={style.itemName}>
            {departmentInfo.hospital[0].name + ' 외 ' + (departmentInfo.hospital.length - 1) + '개'}
          </Text>
        </TouchableOpacity>
      ))}
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
