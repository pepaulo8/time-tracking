import React, { useState } from 'react';
import { Button, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListRegisters from '../../components/listRegisters';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import moment from "moment";

var daysWeek:String[] = []

for (let daysBefore = 7; daysBefore >= 0; daysBefore--) {
    let day = moment().subtract(daysBefore, 'days')
    daysWeek.push(day.format('DD/MM/YYYY'))
} 


const DailyTS: React.FC = () => {

  const { logOut, listOfRegisters, minutesWorked } = useAuth()

  const today = listOfRegisters[0].date
  const hours = Math.floor((minutesWorked/60))
  const minutes = minutesWorked % 60
  const hoursWorked = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

  function handleLogOut() {
    logOut();
  }

  const { width } = Dimensions.get('window')

  return (
    <SafeAreaView>
        <Text style={{
            fontWeight: 'bold',
            color: '#000000',
            textAlign: 'center',
            fontSize: 20
        }}>Date: {today} | Hours worked: {hoursWorked}</Text>
        <ListRegisters data={listOfRegisters} />
    </SafeAreaView>  
  );
}

export default DailyTS;
