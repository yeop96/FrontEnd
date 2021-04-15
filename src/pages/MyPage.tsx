import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

const state = {
  datas: [
    {
      name: '김성엽',
      message: '만 24세 남성 B형\n서울시 광진구 자양 3동\n010-1234-1234',
      img: require('../assets/images/my_heart.png'),
    },
  ],
}

const state2 = {
  datas: [
    {
      name: '초진 차트',
      message: '문진 결과\n질병 예측\n',
    },
    {
      name: '진료과 추천',
      message: '병원 안내\n진료 증상\n신경과',
    },
  ],
}

const state3 = {
  datas: [
    {
      name: '초진 차트',
      message: '문진 결과\n질병 예측\n',
    },
    {
      name: '진료과 추천',
      message: '병원 안내\n진료 증상\n정신과',
    },
  ],
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MyPageScreen() {
  return (
    <ScrollView style={style.container}>
      <Text style={style.textTitle}>진료 기록</Text>
      <Text style={style.textSemiTitle}>기초 문진</Text>
      {/* 대량의 데이터 배열의 요소개수 만큼 Component를 리턴하는map */}
      {state.datas.map((element, index) => {
        return (
          // onPress에서 요소를 제어 할 수 없어서 화살표 함수를 이용함.
          <TouchableOpacity
            key={index}
            style={style.item}
            onPress={() => {
              clickItem(index)
            }}>
            <Image source={element.img} style={style.itemImg}></Image>
            <View style={{ flexDirection: 'column' }}>
              <Text style={style.itemName}>{element.name}</Text>
              <Text style={style.itemMsg}>{element.message}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
      <Text style={style.textSemiTitle}>초진 내역</Text>
      <Text style={style.textSemiTitle}>2021. 4. 16.</Text>
      {state2.datas.map((element, index) => {
        return (
          // onPress에서 요소를 제어 할 수 없어서 화살표 함수를 이용함.
          <TouchableOpacity
            key={index}
            style={style.item}
            onPress={() => {
              clickItem(index)
            }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={style.itemName}>{element.name}</Text>
              <Text style={style.itemMsg}>{element.message}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
      <Text style={style.textSemiTitle}>2021. 3. 15.</Text>
      {state2.datas.map((element, index) => {
        return (
          // onPress에서 요소를 제어 할 수 없어서 화살표 함수를 이용함.
          <TouchableOpacity
            key={index}
            style={style.item}
            onPress={() => {
              clickItem(index)
            }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={style.itemName}>{element.name}</Text>
              <Text style={style.itemMsg}>{element.message}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

//메소드를 호출하면서 파라미터로 클릭된 아이템의 index번호 받아야함.
clickItem = index => {
  // 클릭한 아이템의 name값??
  alert(state.datas[index].name)
}

const style = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 18,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  itemImg: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  itemName: {
    marginLeft: 28,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemMsg: {
    marginLeft: 28,
    fontSize: 16,
    //fontWeight: 'bold',
  },
  textTitle: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSemiTitle: {
    marginBottom: 10,
    fontSize: 22,
  },
})
