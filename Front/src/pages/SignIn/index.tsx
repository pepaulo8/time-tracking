import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

const SignIn: React.FC = (props :any) => {
  const { signIn, messageError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const IMAGE_LOGO = require('../../assets/Click-clock-logo-preview.png');


  function handleSignIn() {
    signIn(email, password);
  }
  
  function goToSignUp() {
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

        {messageError &&
          <Text style={styles.msgError}>
            {messageError}
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
