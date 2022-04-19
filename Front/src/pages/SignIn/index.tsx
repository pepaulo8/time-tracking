import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/auth';


const LOGIN_COLOR = '#139DBF'
const SIGNUP_COLOR = '#25C1E8'

const SignIn: React.FC = () => {

  const { signIn, messageError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const IMAGE_LOGO = require('../../assets/click-clock-logo.png');
  const IMAGE_LOGO = require('../../assets/Click-clock-logo-preview.png');
  

  function handleSignIn() {
    signIn(email, password);
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
            onPress={handleSignIn}
          >
            <Text style={styles.btnTitle}>Sign Up</Text>
      </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: '5%',
    backgroundColor: '#ffffff'
  },
  containerLogo: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor: 'blue'
  },
  imgLogo: {
    width: 160,
    height: 155,
  },
  containerLogin: {
    flex: 5,
    justifyContent: 'center',
    //backgroundColor: 'green',
    marginBottom: '15%',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#F1F5F4',
    borderRadius: 20,
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '90%',
    height: 45,
  },
  btnLogin: {
    backgroundColor: LOGIN_COLOR,
    borderRadius: 15,
    width: '90%',
    height: 45,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSignup: {
    backgroundColor: SIGNUP_COLOR,
    borderRadius: 15,
    width: '90%',
    height: 45,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'center',
    color: '#A0A0A0'
  },
  btnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  msgError: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EC1111',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SignIn;
