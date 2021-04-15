import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import ActionButton from 'react-native-action-button'
import { HomeScreen, MyPageScreen } from './../pages/index'

const Tab = createBottomTabNavigator()

/** FIXME: 네비게이션 타입 지정 */
export default function MainTabNavigator({ navigation }) {
  return (
    <NavigationContainer independent={true}>
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
      {/** 텝바 가운데 플로팅 버튼 */}
      {/** FIXME: 동적 size로 수정 */}
      <ActionButton
        position="center"
        renderIcon={() => (
          <MaterialCommunityIcons name="microphone" color="white" size={30} />
        )}
        offsetY={50}
        buttonColor="#81C4A7"
        onPress={() => navigation.navigate('ChatModal')}
      />
    </NavigationContainer>
  )
}
