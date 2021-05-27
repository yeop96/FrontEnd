import { View, Text, Button, Dimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Voice from 'react-native-voice'
import { GiftedChat } from 'react-native-gifted-chat'
import Tts from 'react-native-tts'
import { ChatDiagnosis } from 'pages'
import Loader from '../components/Loader'
import { useHealthInfoSetState } from 'context'
import Geolocation from 'react-native-geolocation-service'

//상대 사이즈 위해 사용
const { height, width } = Dimensions.get('window')
interface ILocation {
  latitude: number
  longitude: number
}

/** 진료 챗봇 모달 페이지 */
export default function ChatModal() {
  const setHealthInfoState = useHealthInfoSetState()
  const [diagnosisData, setDiagnosisData] = useState({})
  const [location, setLocation] = useState<ILocation | undefined>({ latitude: 37.538712, longitude: 127.082366 })

  //채팅 내역 useState
  const [sessions, setSessions] = useState(Math.round(Math.random() * 1000000))
  const [messages, setMessages] = useState([])
  const [checkupResult, setCheckupResult] = useState<boolean>(false) //검진 결과
  const [loading, setLoading] = useState(false) //로딩

  //STT에 필요한 useState
  const [isRecord, setIsRecord] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const buttonLabel = isRecord ? '음성 멈추기' : '음성 인식 시작'

  /** 임시 데이터, 아래와 같은 형식의 데이터 서버에서 받아 넘겨주면 됨 */
  const tempData = {
    date: '2021.05.21',
    symptom: ['배 아픔', '열이 남', '설사'],
    disease: [
      {
        name: '위장염1',
        description:
          '급성 위장염은 위장관의 염증 상태를 말하여 위나 소장에 염증이 발생한 것을 말합니다. 바이러스의 감염, 박테리아나 기생충의 감염에 의해 발생하게 됩니다.',
        level: '경증 질환',
      },
      { name: '식중독', description: '식중독은 상한 음식을 먹었을 때 주로 발생하며', level: '경증 질환' },
      {
        name: '장폐색',
        description: '장폐색은 블라블라 때문에 발생하며 뭐뭐를 증상으로 가진다. 즉시 조치해야 한다.',
        level: '중증 질환',
      },
    ],
    hospital: 'something',
    medicationBeingTaken: '없음',
  }
  useEffect(() => {
    // 현재 위치 담아두기
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
      // 타임아웃 거는거
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
  }, [])

  // 서버에서 검진 결과 가져오기
  useEffect(() => {
    const dataToSend = {
      radius: '7000',
      user_lng: location.longitude * 1,
      user_lat: location.latitude * 1,
    }
    let formBody = []
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(dataToSend[key])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    fetch('http://52.78.126.183:3000/caps/my-page?' + formBody, {})
      .then((response) => response.json())
      .then((responseJson) => {
        setDiagnosisData(responseJson.result)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  //음성 인식 시작 끝 함수
  const _onSpeechStart = () => {
    console.log('onSpeechStart')
    setText('')
  }
  const _onSpeechEnd = () => {
    console.log('onSpeechEnd')
    setText('')
  }
  //특정 이벤트에서 사용자 음성을 인식하거나 중지하는 것
  const _onSpeechResults = (event) => {
    console.log('onSpeechResults')
    setText(event.value[0])
  }
  const _onSpeechError = (event) => {
    console.log('_onSpeechError')
    console.log(event.error)
  }

  //react-native-voice를 사용하는 컴포넌트가 제거(Unmount)될때 react-native-voice 라이브러리도 제거
  const _onRecordVoice = () => {
    if (isRecord) {
      Voice.stop()
    } else {
      Voice.start('ko-KR') // 영어 쓰고 싶으면 en-US
    }
    setIsRecord(!isRecord)
  }

  //useEffect에서 react-native-voice에서 사용할 이벤트 함수를 연결
  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart
    Voice.onSpeechEnd = _onSpeechEnd
    Voice.onSpeechResults = _onSpeechResults
    Voice.onSpeechError = _onSpeechError

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  //TTS 읽어주기 초기 설정
  Tts.setDefaultLanguage('ko-KR') //ko-KR en-IE
  Tts.addEventListener('tts-start', (event) => console.log('start', event))
  Tts.addEventListener('tts-finish', (event) => console.log('finish', event))
  Tts.addEventListener('tts-cancel', (event) => console.log('cancel', event))
  //사용예시
  //Tts.stop()
  //Tts.speak('Hello, world!')

  //채팅 툴 useEffect 초기설정
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '음성 진료를 시작합니다. 아픈데 있으신가요?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '응급한 김김박이',
          avatar: require('../assets/images/logo.png'),
        },
      },
    ])
  }, [])

  //사용자 대화 틀
  const user = [
    {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: '유저',
      },
    },
  ]
  //대답해주는 봇 대화 틀
  function bot(res = '') {
    response = [
      {
        _id: Math.round(Math.random() * 1000000),
        text: res,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '응급한 김김박이',
          avatar: require('../assets/images/logo.png'),
        },
      },
    ]

    return response
  }

  //메시지 보내기 버튼 누르면 리스트에 차곡 차곡 저장하여 띄어준다.
  const onSend = useCallback((messages = []) => {
    console.log('messages: ', messages)
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])

  // 메시지 보내는 메소드 서버 연결
  function handleSend(newMessage = []) {
    //사용자가 보낸 메시지 올리기
    setMessages(GiftedChat.append(messages, user))
    console.log('messages: ', messages)
    console.log('newMessage: ', newMessage)

    const dataToSend = {
      session: sessions,
      text: text,
    }
    // formBody 서버 url 뒤에 붙일 text
    let formBody = []
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(dataToSend[key])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    //서버 연결 url + fromBody를 통해 get방식이니 그냥 string으로 보내준다.
    fetch('http://52.78.126.183:3000/caps/chatting?' + formBody, {})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        console.log(responseJson.reqText) //input 데이터
        console.log(responseJson.resText) //돌아오는 대답
        onSend(bot(responseJson.resText)) //돌아오는 대답 메시지 띄우기
        Tts.speak(responseJson.resText) //TTS 읽어주기
        if (responseJson.resText === '잠시만 기다려주세요.') {
          setLoading(true)
          setTimeout(() => setCheckupResult(true), 3500)
        }
      })
      .catch((error) => {
        console.error(error)
      })

    //보내면 음성 인식 중단 비워주기
    _onRecordVoice()
    setText('')
  }

  if (checkupResult) {
    Tts.speak('검진 결과를 안내 합니다.') //TTS 읽어주기
    return (
      <View style={{ flex: 1 }}>
        {/* 진단 결과 화면 */}
        <ChatDiagnosis diagnosis={tempData} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Loader loading={loading} />
      {/* 위에 제목 */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          width: width,
          top: 30,
          zIndex: 10,
        }}>
        <Text style={{ fontSize: 25, fontWeight: '700', color: '#69BFA0' }}>음성 진료</Text>
      </View>

      {/* 채팅틀 */}
      <GiftedChat
        placeholder={'진료 시작하세요...'}
        locale="ko"
        dateFormat="YYYY년 M월 DD일"
        //alwaysShowSend={true} //send 버튼 계속 보이고 싶으면 사용
        messages={messages}
        text={text}
        onInputTextChanged={setText}
        textInputProps={{ keyboardAppearance: 'dark', autoCorrect: false }}
        textInputStyle={{}}
        onSend={(newMessage) => handleSend(newMessage)}
        messagesContainerStyle={{ backgroundColor: 'white' }} // 백그라운 색 바꾸고 싶으면 사용
        user={{
          _id: 1,
        }}
      />

      {/* 음성 인식 버튼 */}
      <View style={{ marginTop: 10, marginBottom: 40 }}>
        <Button onPress={_onRecordVoice} title={buttonLabel} />
      </View>
    </View>
  )
}
