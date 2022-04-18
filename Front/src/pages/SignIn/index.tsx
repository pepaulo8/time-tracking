import React from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = () => {

  const { signIn } = useAuth()

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
