import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'

interface ILocation {
  latitude: number
  longitude: number
}

export default function HomeScreen() {
  // 초기값 광진구청으로 설정
  const [location, setLocation] = useState<ILocation | undefined>({ latitude: 37.538712, longitude: 127.082366 })

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

  return (
    <View style={styles.container}>
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
