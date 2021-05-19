import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MyPageScreen, Diagnosis } from 'pages'

const MyPageStack = createStackNavigator()

export default function MyPageStackNavigator() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="MyPageScreen" component={MyPageScreen} options={{ title: ' ' }} />
      <MyPageStack.Screen name="Diagnosis" component={Diagnosis} options={{ title: '초진 내역' }} />
    </MyPageStack.Navigator>
  )
}
