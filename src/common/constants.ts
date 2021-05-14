import { Dimensions } from 'react-native'

/** 계정 정보 */
export interface Auth {
  /** 로딩 여부 */
  isLoading: boolean
  /** 로그아웃 여부 */
  isSignout: boolean
  /** 사용자 토큰 */
  userToken: string | null
}

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height
export const mainColor = '#69BFA0'
