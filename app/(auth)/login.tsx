import { router } from 'expo-router'
import { Text, Button } from 'react-native'

const Login = () => {
  return (
    <>
      <Text className=''>Login Page</Text>
      <Button title="Login" onPress={() => { router.push('/signup')}} />
    </>
  )
}

export default Login