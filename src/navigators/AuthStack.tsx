import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SignInScreen, SignUpScreen } from '../pages/index'

const AuthStack = createStackNavigator()

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </AuthStack.Navigator>
  )
}
