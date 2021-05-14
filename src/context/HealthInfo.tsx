import React, { ReactNode, createContext, useContext, useState } from 'react'

/** 기초문진 데이터 타입 */
export interface BasicQuestionnaire {
  smoking:
    | '피우지 않습니다'
    | '일주일에 한 갑'
    | '일주일에 두 갑'
    | '일주일에 세 갑'
    | '일주일에 네 갑'
    | '일주일에 다섯 갑 이상'
  drink:
    | '마시지 않습니다.'
    | '일주일에 한 번'
    | '일주일에 두 번'
    | '일주일에 세 번'
    | '일주일에 네 번'
    | '일주일에 다섯 번'
    | '일주일에 여섯 번'
    | '매일'
  exercise:
    | '하지 않아요'
    | '일주일에 한 번'
    | '일주일에 두 번'
    | '일주일에 세 번'
    | '일주일에 네 번'
    | '일주일에 다섯 번'
    | '일주일에 여섯 번'
    | '매일'
  medicalHistory: '암' | '뇌졸중' | '심근경색' | '고혈압' | '당뇨병' | '없음'
  familyHistory: '암' | '뇌졸중' | '심장병(심근경색/협심증)' | '고혈압' | '당뇨병' | '이상지질혈증' | '패결핵' | '없음'
}

/** 위치 데이터 타입 */
interface ILocation {
  latitude: number
  longitude: number
}

/** 초진 데이터 타입 */
export interface Diagnosis {
  date: Date
  disease: string
  department: string // 혹은 특정 스트링만 지정 ex) '내과' | '외과'
  hostpial: string
  location: ILocation
}

export interface HealthInfo {
  basicQuestionnaire: BasicQuestionnaire | null
  diagnosis: Diagnosis[]
}

const initialState: HealthInfo = {
  basicQuestionnaire: null,
  diagnosis: [],
}

const HealthInfoContext = createContext<HealthInfo>(initialState)
const HealthInfoDispatchContext = createContext<React.Dispatch<React.SetStateAction<HealthInfo>>>(() => {})

function HealthInfoProvider(props: { children: ReactNode }) {
  const [state, setState] = useState<HealthInfo>(initialState)

  return (
    <HealthInfoDispatchContext.Provider value={setState}>
      <HealthInfoContext.Provider value={state}>{props.children}</HealthInfoContext.Provider>
    </HealthInfoDispatchContext.Provider>
  )
}

/** state 참조용 커스텀 hook */
export function useHealthInfoState() {
  const state = useContext(HealthInfoContext)

  if (!state) {
    throw new Error('Provider not found')
  }

  return state
}

/** Reducer 참조용 커스텀 hook */
export function useHealthInfoSetState() {
  const state = useContext(HealthInfoDispatchContext)

  if (!state) {
    throw new Error('Provider not found')
  }

  return state
}

export { HealthInfoContext, HealthInfoProvider }
