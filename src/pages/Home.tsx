import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import Geolocation from 'react-native-geolocation-service'
import { useHealthInfoState } from 'context'
import { BasicQuestionnaire } from 'pages'
import { mainColor } from 'common'

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
  // 초기값 광진구청으로 설정
  const [location, setLocation] = useState<ILocation | undefined>({ latitude: 37.538712, longitude: 127.082366 })
  const HealthInfo = useHealthInfoState()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false)

  useEffect(() => {
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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
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
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            //latitude: {location.longitude},
            //longitude: location?.longitude,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{ latitude: 37.538712, longitude: 127.082366 }}
            title="응급실"
            description="정신의과 전문 응급실"
          />
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="현재위치"
            description="내위치"
          />
        </MapView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //height: 400,
    //width: 400,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
