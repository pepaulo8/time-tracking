import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

const SignIn: React.FC = (props :any) => {
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageErrorSignIn, setmessageErrorSignIn] = useState<string | undefined>()
  const IMAGE_LOGO = require('../../assets/Click-clock-logo-preview.png');
   

  async function handleSignIn() {
    const responseMsg  = await signIn(email, password);
    console.log(responseMsg)
    responseMsg ? setmessageErrorSignIn(responseMsg) : false;
  }
  
  function goToSignUp() {
    setmessageErrorSignIn(undefined)
    props.navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.imgLogo}
          source={IMAGE_LOGO}
        />
      </View>
      <View style={styles.containerLogin}>

        <TextInput style={styles.input}
          placeholder='E-mail' keyboardType='email-address'
          onChangeText={value => setEmail(value)}
        />

        <TextInput style={styles.input}
          placeholder='Password' secureTextEntry
          onChangeText={value => setPassword(value)}
        />

        {messageErrorSignIn &&
          <Text style={styles.msgError}>
            {messageErrorSignIn}
          </Text>
        }
        <TouchableOpacity onPress={handleSignIn} style={styles.btnLogin}>
          <Text style={styles.btnTitle}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.SignUpText}>
          Don't have an account?
        </Text>
        
        <TouchableOpacity style={styles.btnSignup} 
          onPress={goToSignUp}>
          <Text style={styles.btnTitle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignIn;
