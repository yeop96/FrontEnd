import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import RadioForm from 'react-native-simple-radio-button'

export default function RegisterScreen(props) {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userGender, setUserGender] = useState('')
  const [userBirth, setUserBirth] = useState('')
  const [errortext, setErrortext] = useState('')
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false)
  const [date, setDate] = useState(new Date())

  //라디오 버튼 설정
  const radio_props = [
    { label: '남성', value: 0 },
    { label: '여성', value: 1 },
  ]

  const clickRadio = (value) => {
    if (value === 0) {
      setUserGender('남성')
    }
    if (value === 1) {
      setUserGender('여성')
    }
  }

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
    setUserBirth(currentDate)
    console.log(currentDate)
  }

  const handleSubmitButton = () => {
    setErrortext('')
    if (!userName) {
      Alert.alert('이름을 입력 해주세요!')
      return
    }
    if (!userEmail) {
      Alert.alert('아이디 입력 해주세요!')
      return
    }
    if (!userPassword) {
      Alert.alert('비밀번호 입력 해주세요!')
      return
    }
    if (!userAddress) {
      Alert.alert('주소를 입력 해주세요!')
      return
    }
    if (!userGender) {
      Alert.alert('성별을 선택 해주세요!')
      return
    }

    //회원가입 시 필요한 데이터들
    const dataToSend = {
      name: userName,
      id: userEmail,
      pwd: userPassword,
      address: userAddress,
      gender: userGender,
      birth: userBirth,
    }
    // formBody 서버 url 뒤에 붙일 회원정보들 string형식으로 붙이기
    let formBody = []
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(dataToSend[key])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    //서버 연결 url + fromBody를 통해 get방식이니 그냥 string으로 보내준다.
    fetch('http://52.78.126.183:3000/caps/sign-up?' + formBody, {})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        // 회원가입 성공시 true 반환
        if (responseJson.performance === true) {
          setIsRegistraionSuccess(true)
        } else {
          Alert.alert('확인', responseJson.message)
          setErrortext(responseJson.msg)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#69BFA0',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text style={styles.successTextStyle}>회원가입 성공</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>로그인</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#69BFA0' }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            {/* 이름 */}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="이름"
              placeholderTextColor="#FFFFFF"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            {/* 아이디 */}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="아이디"
              placeholderTextColor="#FFFFFF"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            {/* 비밀번호 */}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="비밀번호"
              placeholderTextColor="#FFFFFF"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            {/* 주소 */}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAddress) => setUserAddress(UserAddress)}
              underlineColorAndroid="#f000"
              placeholder="주소"
              placeholderTextColor="#FFFFFF"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            {/* 성별 */}
            <RadioForm
              radio_props={radio_props}
              initial={-1}
              labelColor={'white'}
              buttonColor={'white'}
              selectedButtonColor={'white'}
              formHorizontal={true}
              buttonWrapStyle={{ marginLeft: 20 }}
              buttonOuterSize={25}
              labelStyle={{ fontSize: 16, color: 'white', marginRight: 20 }}
              onPress={(value) => {
                clickRadio(value)
              }}
            />
          </View>

          <View>
            <Text style={styles.TextStyle}>생년월일</Text>
            <View style={styles.SectionStyle}>
              <DatePicker
                value={date}
                style={{
                  flex: 1,
                  width: 200,
                }}
                date={date}
                mode="date"
                display="spinner"
                locale="ko"
                placeholder="생년월일 선택"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate={date}
                confirmBtnText="확인"
                cancelBtnText="취소"
                showIcon={false}
                onChange={onChange}
                allowFontScaling={true}
                customStyles={{
                  dateInput: {
                    borderColor: 'white',
                    fontSize: 30,
                    fontColor: 'white',
                    borderWidth: 1,
                    borderRadius: 30,
                  },
                  dateText: {
                    fontSize: 16,
                    color: 'white',
                  },
                  duration: {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                  },
                  fontSize: 30,
                }}
                onDateChange={onChange}
              />
            </View>
          </View>

          {errortext != '' ? <Text style={styles.errorTextStyle}>{errortext}</Text> : null}
          <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>회원가입</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
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
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  TextStyle: {
    marginLeft: 35,
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
})
