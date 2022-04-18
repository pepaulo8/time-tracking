import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = () => {

  const { signIn, messageError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignIn() {
    signIn(email, password);
  }

  return (
    <View>
      <TextInput 
      placeholder='email' keyboardType='email-address'
      onChangeText={value => setEmail(value)}
      />
      
      <TextInput 
      placeholder='password' secureTextEntry 
      onChangeText={value => setPassword(value)}
      />

      { messageError && 
        <Text>{messageError}</Text> 
      }

      <Button title='Sign In' onPress={handleSignIn}/>
    </View>
  );
}

export default SignIn;
