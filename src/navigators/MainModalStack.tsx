import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import { MainTabNavigator } from './index'
import { ChatModal } from '../pages/index'

const MainModalStack = createStackNavigator()

export default function MainModalStackNavigator() {
  return (
    <MainModalStack.Navigator
      /** ios 모달 스타일로 설정 */
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.findIndex((r) => r.key === route.key) > 0 ? 0 : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      })}
      mode="modal">
      <MainModalStack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
      <MainModalStack.Screen
        name="ChatModal"
        component={ChatModal}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </MainModalStack.Navigator>
  )
}
