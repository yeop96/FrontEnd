import React, { useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { mainColor } from 'common'

const Button = styled.TouchableOpacity`
  width: ${320}px;
  height: ${50}px;
  border-width: 1px;
  border-radius: ${4}px;
  align-items: center;
  justify-content: center;
`

export default function DefaultButton(props: {
  scrollToNext: (infoKey: any, value: any) => void
  label: string
  infoKey: any
}) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <Button
      style={{
        marginBottom: 8,
        borderColor: isSelected ? mainColor : '#e1e1e1',
        backgroundColor: isSelected ? mainColor : '#ffffff',
      }}
      onPress={() => {
        setIsSelected((prev) => !prev)
        props.scrollToNext(props.infoKey, [props.label])
      }}>
      <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{props.label}</Text>
    </Button>
  )
}
