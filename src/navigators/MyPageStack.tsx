import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MyPageScreen, Diagnosis } from 'pages'

const MyPageStack = createStackNavigator()

export default function MyPageStackNavigator() {
  return (
    <MyPageStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <MyPageStack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{ headerShown: false, headerTitle: '' }}
      />
      <MyPageStack.Screen name="Diagnosis" component={Diagnosis} options={{ title: '초진 내역' }} />
    </MyPageStack.Navigator>
  )
}
