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

/** 병원 데이터 타입 */
export interface Hospital {
  name: string
  location: ILocation
  remainingSickbed: number
}

/** 진료과 데이터 타입*/
export interface Department {
  name: string
  hospital: Hospital[]
}

/** 초진 데이터 타입 */
export interface Diagnosis {
  date: Date
  disease: string[]
  department: Department[]
}

export interface HealthInfo {
  basicQuestionnaire: BasicQuestionnaire | null
  diagnosis: Diagnosis[]
}

const initialState: HealthInfo = {
  basicQuestionnaire: null,
  diagnosis: [
    {
      date: new Date(),
      disease: ['위장염', '식중독', '장폐색'],
      department: [
        {
          name: '내과',
          hospital: [{ name: '홍익병원', location: { latitude: 233, longitude: 155 }, remainingSickbed: 3 }],
        },
        {
          name: '가정의학과',
          hospital: [{ name: '세브란스병원', location: { latitude: 200, longitude: 151 }, remainingSickbed: 13 }],
        },
      ],
    },
    {
      date: new Date('2020-12-17T03:24:00'),
      disease: ['폐렴', '무슨병'],
      department: [
        {
          name: '이비인후과',
          hospital: [{ name: '양천병원', location: { latitude: 233, longitude: 155 }, remainingSickbed: 3 }],
        },
        {
          name: '기관지외과',
          hospital: [{ name: '광진병원', location: { latitude: 200, longitude: 151 }, remainingSickbed: 13 }],
        },
      ],
    },
    {
      date: new Date('2020-12-17T03:24:00'),
      disease: ['폐렴', '무슨병'],
      department: [
        {
          name: '이비인후과',
          hospital: [{ name: '양천병원', location: { latitude: 233, longitude: 155 }, remainingSickbed: 3 }],
        },
        {
          name: '기관지외과',
          hospital: [{ name: '광진병원', location: { latitude: 200, longitude: 151 }, remainingSickbed: 13 }],
        },
      ],
    },
  ],
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
