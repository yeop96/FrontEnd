import * as React from 'react'
import { TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from 'context'

/** 로그인 페이지 */
export default function ChatModal({ navigation }) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { signIn } = React.useContext(AuthContext)

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
      <Button title="Sign up" onPress={() => navigation.navigate('SignUpScreen')} />
    </SafeAreaView>
  )
}
