import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { useRegister } from '../../contexts/register';
import styles from './styles';


const Application: React.FC = (props :any) => {

  const {  logOut, user } = useAuth()
  const { responseRegister, register, getRegisterPeriod, clearRegisters } = useRegister()

  function handleLogOut() {
    clearRegisters()
    logOut();
  }

  async function handleRegister() {
    await register()
  }

  function goToDailyTS() {
    // const today = '2022-05-02'
    clearRegisters()
    const today = moment().format('YYYY-MM-DD')
    getRegisterPeriod(today, today)
    props.navigation.navigate('Daily Time sheet')
    
  }

  function goToMonthTS() {
    clearRegisters()
    const today = moment().format('YYYY-MM-DD')
    const firstDayMonth = today.slice(0,8) + '01'
    getRegisterPeriod(firstDayMonth, today)
    props.navigation.navigate('Time sheet')
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerData}>
        <Text style={styles.titleForm}>
          Hello, {user?.name}
        </Text>
        <Text style={styles.subtitleForm}>
          Click below to confirm your register
        </Text>
      
        <TouchableOpacity onPress={handleRegister} style={styles.btnSecondary}>
          <Text style={styles.btnTitle}>{responseRegister?.nextType ? `Clock ${responseRegister?.nextType}` : 'Register'}</Text>
        </TouchableOpacity>

        {responseRegister?.message &&
          <View style={styles.containerResponse}>
            <Text style={styles.msgSuccess}>
              {responseRegister?.message}
            </Text>
            <View >
              <Text style={styles.info}>
                Date: {responseRegister?.date}
              </Text>
              <Text style={styles.info}>
                Time: {responseRegister?.time}
              </Text>
              <Text style={styles.info}>
                Type: {responseRegister?.type}
              </Text>
            </View>
          </View>
          
        }

      </View>
      <View style={styles.containerOptions}>
        <TouchableOpacity onPress={goToDailyTS} style={styles.btnPrimary}>
            <Text style={styles.btnTitle}>Daily time sheet</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={goToMonthTS} style={styles.btnPrimary}>
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
