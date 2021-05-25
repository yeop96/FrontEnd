import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import { AuthContext } from 'context'

export default function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errortext, setErrortext] = useState('')
  const { signIn } = React.useContext(AuthContext)

  const handleSubmitPress = () => {
    setErrortext('')
    if (!userEmail) {
      Alert.alert('아이디를 입력해주세요!')
      return
    }
    if (!userPassword) {
      Alert.alert('비밀번호를 입력해주세요!')
      return
    }

    // dataToSend에 아이디 비밀번호를 저장
    let dataToSend = { id: userEmail, pwd: userPassword }
    // formBody에 url 형식에 맞춰 id=test1& 이런식으로 붙여서 보내줌
    let formBody = []
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key)
      let encodedValue = encodeURIComponent(dataToSend[key])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    //서버 연결 부분 fetch에 url + formBody를 해서 보내준다. get방식
    //예시 http://52.78.126.183:3000/caps/login?id=test1&pwd=1234
    fetch('http://52.78.126.183:3000/caps/login?' + formBody, {})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        // 로그인 성공시 true 반환
        if (responseJson.performance === true) {
          console.log(responseJson.id)
          signIn({ userEmail, userPassword }) //로그인 성공시 넘어가기
        } else {
          setErrortext(responseJson.msg)
          console.log('아이디나 비밀번호 확인해주세요')
          Alert.alert('오류', '아이디나 비밀번호 확인해주세요')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/images/logo.png')}
                style={{
                  width: '50%',
                  height: 200,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 40 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.titleFTextStyle}>
                  메디
                  <Text style={styles.titleETextStyle}>포유</Text>
                </Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  //아이디 userEmail 변수에 setUserEmail 함수 유스스테이트를 통해 저장
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  placeholder="아이디"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  //비밀번호 userPassword 변수에 setUserPassword 함수 유스스테이트를 통해 저장
                  onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                  placeholder="비밀번호"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              {errortext != '' ? <Text style={styles.errorTextStyle}>{errortext}</Text> : null}
              <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>로그인</Text>
              </TouchableOpacity>
              <Text style={styles.registerTextStyle} onPress={() => navigation.navigate('RegisterScreen')}>
                회원가입
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#69BFA0',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#3F7360',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  titleFTextStyle: {
    color: '#F27979',
    fontWeight: 'bold',
    paddingVertical: 10,
    fontSize: 25,
  },
  titleETextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    paddingVertical: 10,
    fontSize: 25,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#9CD9C2',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
})
