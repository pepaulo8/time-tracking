import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import styles from './styles';


const Application: React.FC = () => {

  const { logOut, user, register } = useAuth()

  const [time, setTime] = useState('loading...')
  const [date, setDate] = useState('loading...')
  const [type, setType] = useState<string | undefined>()
  const [message, setMessage] = useState<string | boolean>(false)

  function handleLogOut() {
    logOut();
  }
  async function handleRegister() {
    const response = await register()
    console.log('response', response)
    setMessage(response?.message)
    setType(response?.nextType)
    setDate(response?.result.date)
    setTime(response?.result.time)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerData}>
        <Text style={styles.titleForm}>
          Olá, {user?.name}
        </Text>
        <Text style={styles.subtitleForm}>
          Click below to confirm your register
        </Text>
      
        <TouchableOpacity onPress={handleRegister} style={styles.btnSecondary}>
          <Text style={styles.btnTitle}>{type ? `Clock ${type}` : 'Register'}</Text>
        </TouchableOpacity>

        {message &&
          <View style={styles.containerResponse}>
            <Text style={styles.msgSuccess}>
              {message}
            </Text>
            <View >
              <Text style={styles.info}>
                Date: {date}
              </Text>
              <Text style={styles.info}>
                Time: {time}
              </Text>
            </View>
          </View>
          
        }

      </View>
      <View style={styles.containerOptions}>
        <TouchableOpacity onPress={handleLogOut} style={styles.btnPrimary}>
            <Text style={styles.btnTitle}>Daily time sheet</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut} style={styles.btnPrimary}>
            <Text style={styles.btnTitle}>Time sheet</Text>
          </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogOut} style={styles.btnLogout}>
          <Text style={styles.btnTitle}>Log out</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Application;
