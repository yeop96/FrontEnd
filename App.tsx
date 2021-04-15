/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ActionButton from 'react-native-action-button'
import { HomeScreen, MyPageScreen } from './src/pages'

const Tab = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#81C4A7',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: function icon({ color, size }) {
            return (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )
          },
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: 'My Page',
          tabBarIcon: function icon({ color, size }) {
            return (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export function App() {
  return (
    <NavigationContainer>
      <MyTabs />
      <ActionButton
        position="center"
        renderIcon={() => (
          <MaterialCommunityIcons name="microphone" color="white" size={30} />
        )}
        offsetY={50}
        buttonColor="#81C4A7"
        onPress={() => {
          console.log('hi')
        }}
      />
    </NavigationContainer>
  )
}

export default App
