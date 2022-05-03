import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Image, Keyboard, Animated, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';
import styles from './styles';


const SignIn: React.FC = (props :any) => {
  const { signIn } = useAuth()

  const [logo] = useState(new Animated.ValueXY({x: 210, y: 200}))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageErrorSignIn, setmessageErrorSignIn] = useState<string | undefined>()
  const IMAGE_LOGO = require('../../assets/Click-clock-logo-preview.png');
   
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  }, [])

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 95,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 90,
        duration: 100,
        useNativeDriver: false
      })
    ]).start()
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 210,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 200,
        duration: 100,
        useNativeDriver: false
      })
    ]).start()
  }

  async function handleSignIn() {
    const responseMsg  = await signIn(email, password);
    responseMsg ? setmessageErrorSignIn(responseMsg) : false;
  }
  
  function goToSignUp() {
    setmessageErrorSignIn(undefined)
    props.navigation.navigate('SignUp')
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior='height'>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
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
      </KeyboardAvoidingView>
  )
}

export default SignIn;
