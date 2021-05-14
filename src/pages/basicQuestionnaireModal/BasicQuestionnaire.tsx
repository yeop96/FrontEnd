import React, { useRef, useEffect, useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import Modal from 'react-native-modal'
import { useHealthInfoState, useHealthInfoSetState, BasicQuestionnaire as BasicQuestionnaireType } from 'context'
import { Smoking, Drink, Exercise, MdeicalHistory, FamilyHistory } from './index'
import { screenWidth, mainColor } from 'common'

/** 추가정보를 입력받는 모달 화면 */
export default function BasicQuestionnaire(props: any) {
  const scrollViewRef = useRef<ScrollView>(null)
  const healthInfo = useHealthInfoState()
  const setHealthInfoState = useHealthInfoSetState()
  const isFocused = useIsFocused()
  const [currentScreenNumber, setCurrentScreenNumber] = useState(1)
  const [basicQuestionnaire, setBasicQuestionnaire] = useState(healthInfo.basicQuestionnaire)

  /** 추가정보 입력 모달을 닫으면 healthInfo에 저장 */
  useEffect(() => {
    return () => {
      if (!isFocused) {
        setHealthInfoState((prev) => ({ ...prev, basicQuestionnaire: basicQuestionnaire }))
      }
    }
  }, [isFocused, setHealthInfoState, basicQuestionnaire])

  type valueof<T> = T[keyof T]
  /** 추가 정보 선택 시 데이터 저장 후 다음 화면으로 스크롤하는 함수 */
  function scrollToNext(infoKey: keyof BasicQuestionnaireType, value: valueof<BasicQuestionnaireType>) {
    // 마지막 스크린에서 정보를 입력받았다면 모달을 닫음
    if (currentScreenNumber === 5) {
      props.setModalVisible()
    }

    // 각 화면에서 선택한 데이터를 BasicQuestionnaire에 저장함
    setBasicQuestionnaire((prev) => ({ ...prev, [infoKey]: value }))

    // 다음 화면으로 스크롤
    scrollViewRef.current &&
      scrollViewRef.current.scrollTo({ x: screenWidth * currentScreenNumber, y: 0, animated: true })
    setCurrentScreenNumber((prev: number) => prev + 1)
  }

  return (
    <Modal isVisible={props.modalVisible} style={{ margin: 0 }}>
      {/** 헤더처럼 보이게 하는 부분 */}
      <View style={{ height: 100, backgroundColor: 'white', justifyContent: 'flex-end' }}>
        <Text style={{ color: '#333333', marginBottom: 16, marginLeft: 16, fontSize: 22, fontWeight: 'bold' }}>
          기초문진
        </Text>
      </View>
      {/** 진행률 표시 바 */}
      <View style={{ backgroundColor: '#E1F4F7', width: screenWidth, height: 2 }}>
        <Progress.Bar
          progress={currentScreenNumber / 5}
          width={screenWidth}
          height={2}
          borderWidth={0}
          color={mainColor}
        />
      </View>
      {/** 기초문진 화면 컴포넌트를 가로 스크롤뷰에 넣어 넘김 */}
      <ScrollView scrollEnabled={false} ref={scrollViewRef} horizontal={true}>
        <Smoking scrollToNext={scrollToNext} />
        <Drink scrollToNext={scrollToNext} />
        <Exercise scrollToNext={scrollToNext} />
        <MdeicalHistory scrollToNext={scrollToNext} />
        <FamilyHistory scrollToNext={scrollToNext} />
      </ScrollView>
    </Modal>
  )
}
