import React, { useState } from 'react';
import { Button, Text, View, KeyboardAvoidingView, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

const SignUp: React.FC = (props: any) => {

  const { signUp, messageError } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setconfirmPwd] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)


  function handleSignUp() {
    console.warn('clicou')
    signUp(name, email, password);
  }

  function goToLogin() {
    props.navigation.navigate('Login')
  }

  function checkPassword(value: string, type: string) {
    if(type.includes('confirm')){
      !!password && !!value ? setPasswordValid(password == value) : setPasswordValid(false);
    } else {
      !!value && !!confirmPwd ? setPasswordValid(value == confirmPwd) : setPasswordValid(false);
    }
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSignup}>

        <Text style={styles.titleForm}> CREATE ACCOUNT </Text>
        <TextInput style={styles.input}
          placeholder='Name'
          onChangeText={value => setName(value)}
        />
        <TextInput style={styles.input}
          placeholder='E-mail' keyboardType='email-address'
          onChangeText={value => setEmail(value)}
        />

        <TextInput style={styles.input}
          placeholder='Password' secureTextEntry
          onChangeText={value => {
            setPassword(value)
            checkPassword(value, 'password')
          }  
          }
        />
        <TextInput style={styles.input}
          placeholder='Confirm password' secureTextEntry
          onChangeText={value => {
            setconfirmPwd(value)
            checkPassword(value, 'confirm')
          }
        }
        />

        {!!password && !passwordValid &&
          <Text style={styles.msgError}>
            Confirm password not match
          </Text>
        }
        {messageError &&
          <Text style={styles.msgError}>
            {messageError}
          </Text>
        }
        <TouchableOpacity onPress={handleSignUp} 
          style={passwordValid? styles.btnSignup : styles.btnSignupDisabled}
          disabled={!passwordValid}
        >
          <Text style={styles.btnTitle}>Join</Text>
        </TouchableOpacity>

        <Text style={styles.SignUpText}>
          Don you have an account?
        </Text>
        <TouchableOpacity style={styles.btnLogin}
          onPress={goToLogin}
        >
          <Text style={styles.btnTitle}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp;
