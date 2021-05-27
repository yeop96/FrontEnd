import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import Geolocation from 'react-native-geolocation-service'
import { useHealthInfoState } from 'context'
import { BasicQuestionnaire } from 'pages'
import { mainColor } from 'common'
import Loader from '../components/Loader'
import { useHealthInfoSetState } from 'context'

interface ILocation {
  latitude: number
  longitude: number
}

function GuideModal(props: { visible: boolean; setVisible: () => void }) {
  return (
    <Modal isVisible={props.visible} onBackdropPress={props.setVisible}>
      <View style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 32 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: mainColor }}>안내</Text>
        <Text style={{ fontSize: 16 }}>
          {
            '메디포유는 보건복지부 정책에 따라 경증 환자를 지역응급의료기관으로 안내합니다.\n대형병원의 밀집도를 낮춰 중증 환자들의 빠른 조치를 가능케 하고 경증 환자의 대기시간과 의료비용을 절감합니다.'
          }
        </Text>
      </View>
    </Modal>
  )
}

export default function HomeScreen() {
  const setHealthInfoState = useHealthInfoSetState()
  const [location, setLocation] = useState<ILocation | undefined>({ latitude: 37.538712, longitude: 127.082366 })
  const HealthInfo = useHealthInfoState()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false)
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true) //로딩 처음에 무조건 트루

  useEffect(() => {
    // 현재 위치 담아두기
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({
          latitude,
          longitude,
        })
      },
      (error) => {
        console.log(error.code, error.message)
      },
      // 타임아웃 거는거
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
  }, [])

  // 서버 연결해서 병원정보 가져오기
  useEffect(() => {
    //서버 연결
    const dataToSend = {
      radius: '7000',
      user_lng: location.longitude * 1,
      user_lat: location.latitude * 1,
    }
    // formBody 서버 url 뒤에 붙일 회원 위치 string형식으로 붙이기
    let formBody = []
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(dataToSend[key])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    //서버 연결 url + fromBody를 통해 get방식이니 그냥 string으로 보내준다.
    fetch('http://52.78.126.183:3000/caps/hospital?' + formBody, {})
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false) //로딩화면 꺼지기
        console.log(formBody)
        //console.log(responseJson)
        setHospitals(responseJson.result)
        console.log(hospitals.map((data) => data.dutyEmclsName._text))
      })
      .catch((error) => {
        setLoading(false) //로딩화면 꺼지기
        console.error(error)
      })
  }, [])

  // 서버에서 초진내역 가져오기
  useEffect(() => {
    const dataToSend = {
      scenario: '1', //시나리오 변경시 여기
      radius: '7000',
      user_lng: location.longitude * 1,
      user_lat: location.latitude * 1,
    }
    let formBody = []
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(dataToSend[key])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    fetch('http://52.78.126.183:3000/caps/my-page-array?' + formBody, {})
      .then((response) => response.json())
      .then((responseJson) => {
        setHealthInfoState((prev) => ({ ...prev, diagnosis: responseJson.result }))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (HealthInfo.basicQuestionnaire === null) {
      setModalVisible(true)
    }
    // 마운트할때만 체크하기 위해 디펜던시 비움
  }, [])

  return (
    <View style={styles.container}>
      <BasicQuestionnaire
        modalVisible={modalVisible}
        setModalVisible={() => {
          setModalVisible(false)
          setInfoModalVisible(true)
        }}
      />
      <GuideModal visible={infoModalVisible} setVisible={() => setInfoModalVisible(false)} />
      <Loader loading={loading} />
      {location && (
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* 내위치 마커 찍기 */}
          {/* <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="현재위치"
            description="내위치"
          /> */}

          {/* 병원 정보 가져와서 반경 다 찍어주기 */}
          {hospitals.map((data, index) => {
            let emgCongestion = ''
            if (data.emgCongestion._text === 'Y') {
              emgCongestion = '응급실 인원 : 혼잡'
            } else {
              emgCongestion = '응급실 인원 : 원활'
            }
            if (data.dutyEmclsName._text === '권역응급의료센터') {
              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: data.wgs84Lat._text * 1, longitude: data.wgs84Lon._text * 1 }}
                  title={data.dutyName._text}
                  description={
                    data.dutyEmclsName._text +
                    ' (심각한 중증 진료 추천)' +
                    '\n' +
                    data.dutyAddr._text +
                    '\n' +
                    emgCongestion +
                    '\n' +
                    '번호 : ' +
                    data.dutyTel1._text
                  }
                  pinColor="red"
                />
              )
            } else if (data.dutyEmclsName._text === '지역응급의료센터') {
              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: data.wgs84Lat._text * 1, longitude: data.wgs84Lon._text * 1 }}
                  title={data.dutyName._text}
                  description={
                    data.dutyEmclsName._text +
                    ' (지역내 중증 진료 추천)' +
                    '\n' +
                    data.dutyAddr._text +
                    '\n' +
                    emgCongestion +
                    '\n' +
                    '번호 : ' +
                    data.dutyTel1._text
                  }
                  pinColor="red"
                />
              )
            } else {
              //지역응급의료기관
              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: data.wgs84Lat._text * 1, longitude: data.wgs84Lon._text * 1 }}
                  title={data.dutyName._text}
                  description={
                    data.dutyEmclsName._text +
                    ' (경증 진료 추천)' +
                    '\n' +
                    data.dutyAddr._text +
                    '\n' +
                    emgCongestion +
                    '\n' +
                    '번호 : ' +
                    data.dutyTel1._text
                  }
                  pinColor="green"
                />
              )
            }
          })}
        </MapView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
