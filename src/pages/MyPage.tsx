import * as React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

/** 기초 문진 데이터 */
const basicQuestionnaire = {
  name: '김성엽',
  message: '만 24세 남성 B형\n서울시 광진구 자양 3동\n010-1234-1234',
}

/** 초진 내역 데이터 */
const diagnosis = [
  {
    // FIXME: 날짜와 위치 데이터 형식 논의 후 수정
    date: '2021.04.16',
    disease: '폐렴',
    department: '흉부내과(?)',
    hostpial: '세브란스병원',
    location: '데이터 형식 미정',
  },
  {
    date: '2021.03.15',
    disease: '급성 알레르기',
    department: '내과',
    hostpial: '홍익병원',
    location: '데이터 형식 미정',
  },
]

/** 마이페이지 */
export default function MyPageScreen() {
  return (
    <ScrollView style={style.container}>
      <Text style={style.textTitle}>진료 기록</Text>
      <Text style={style.textSemiTitle}>기초 문진</Text>
      {
        <TouchableOpacity
          style={[style.item, { marginBottom: 26 }]}
          onPress={() => {
            clickItem(0)
          }}>
          <MaterialCommunityIcons name="file-document-edit" color={'#81C4A7'} size={56} />
          <View style={{ flexDirection: 'column', marginLeft: 14 }}>
            <Text style={style.itemName}>{basicQuestionnaire.name}</Text>
            <Text style={style.itemMessage}>{basicQuestionnaire.message}</Text>
          </View>
        </TouchableOpacity>
      }
      <Text style={style.textSemiTitle}>초진 내역</Text>
      {diagnosis.map((data, index) => {
        return (
          // onPress에서 요소를 제어 할 수 없어서 화살표 함수를 이용함.
          <View>
            <Text style={style.textDateTitle}>{data.date}</Text>
            <TouchableOpacity
              key={index}
              style={style.item}
              onPress={() => {
                clickItem(data.disease)
              }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={[style.itemMessage, { marginBottom: 6 }]}>질병</Text>
                <Text style={style.itemName}>{data.disease}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              key={index}
              style={style.item}
              onPress={() => {
                clickItem(data.department)
              }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={[style.itemMessage, { marginBottom: 6 }]}>병원</Text>
                <Text style={[style.itemName, { marginBottom: 18 }]}>{data.hostpial}</Text>
                <Text style={[style.itemMessage, { marginBottom: 6 }]}>진료과</Text>
                <Text style={style.itemName}>{data.department}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
    </ScrollView>
  )
}

//메소드를 호출하면서 파라미터로 클릭된 아이템의 index번호 받아야함.
const clickItem = (data: any) => {
  // 클릭한 아이템의 name값??
  alert(data)
}

const style = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#efefef' },
  item: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  itemImg: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 20,
  },
  itemMessage: {
    fontSize: 16,
    color: '#555555',
  },
  textTitle: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSemiTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 24,
  },
  textDateTitle: {
    marginBottom: 6,
    fontSize: 16,
  },
})
