import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AuthContext from '../../contexts/auth';

const SignIn: React.FC = () => {

  const { signed, signIn } = useContext(AuthContext)
  console.log(signed)

  function handleSignIn() {
    signIn();
  }

  return (
    <View>
      <TextInput placeholder='email' />
      <TextInput placeholder='password' secureTextEntry/>
      <Button title='Sign In' onPress={handleSignIn}/>
    </View>
  );
}

export default SignIn;
