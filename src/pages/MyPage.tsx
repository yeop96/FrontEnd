import * as React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { HealthInfo, useHealthInfoState } from 'context'

/** 기초 문진 데이터 */
const basicQuestionnaire = {
  name: '김대엽',
  message: '만 24세 남성 B형\n서울시 광진구 자양 3동\n010-1234-1234',
}

/** 마이페이지 */
export default function MyPageScreen({ navigation }) {
  const healthInfo: HealthInfo = useHealthInfoState()

  //메소드를 호출하면서 파라미터로 클릭된 아이템의 index번호 받아야함.
  const clickItem = (params: { data: any; index: number }) => {
    navigation.navigate('Diagnosis', { diagnosis: params.data, index: params.index })
  }

  return (
    <ScrollView style={style.container}>
      <Text style={style.textTitle}>진료 기록</Text>
      <Text style={style.textSemiTitle}>기초 문진</Text>
      {
        <TouchableOpacity style={[style.item, { marginBottom: 26 }]} onPress={() => {}}>
          <MaterialCommunityIcons name="file-document-edit" color={'#81C4A7'} size={48} />
          <View style={{ flexDirection: 'column', marginLeft: 14 }}>
            <Text style={[style.itemName, { marginBottom: 6 }]}>{basicQuestionnaire.name}</Text>
            <Text style={style.itemMessage}>{basicQuestionnaire.message}</Text>
          </View>
        </TouchableOpacity>
      }
      <Text style={style.textSemiTitle}>초진 내역</Text>
      {healthInfo.diagnosis.map((data, index) => {
        return (
          <View>
            <Text style={style.textDateTitle}>{data.date}</Text>
            <TouchableOpacity
              key={index}
              style={[style.item, { flexDirection: 'column', alignItems: 'flex-start' }]}
              onPress={() => {
                clickItem({ data: data, index: index })
              }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={[style.itemMessage, { marginBottom: 6 }]}>예상 질병</Text>
                <Text style={style.itemName}>{data.disease[0].name}</Text>
              </View>
              <View style={{ width: 300, marginVertical: 14, height: 2, backgroundColor: '#f2f2f2f2' }} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={[style.itemMessage, { marginBottom: 6 }]}>분류</Text>
                <Text style={style.itemName}>{data.disease[0].level}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
      <Text style={{ marginTop: 10, marginLeft: 5, color: '#999999' }}>
        ※ 본 서비스는 질환 치료 목적의 서비스가 아닙니다.
      </Text>
      <Text style={{ marginTop: 10, marginLeft: 5, color: '#999999' }}>
        ※ 질환 발생유무와 위험을 확인해주지 않으며, 의료행위가 포함되어 있지 않습니다.
      </Text>
      {/** 바텀텝에 가려지지 않도록 띄워주는 빈 공간 */}
      <View style={{ height: 60 }} />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f3f3' },
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
    fontSize: 18,
  },
  itemMessage: {
    fontSize: 14,
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
