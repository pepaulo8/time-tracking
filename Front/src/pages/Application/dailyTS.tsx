import React, { useState } from 'react';
import { Button, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListRegisters from '../../components/listRegisters';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import moment from "moment";
import Loader from '../../components/loader';

var daysWeek:String[] = []

for (let daysBefore = 7; daysBefore >= 0; daysBefore--) {
    let day = moment().subtract(daysBefore, 'days')
    daysWeek.push(day.format('DD/MM/YYYY'))
} 


const DailyTS: React.FC = () => {

  const { loading, logOut, listOfRegisters, infoWorked } = useAuth()

  if(!loading && !listOfRegisters){
    return (
      <Loader />
    ) 
  }

  const today = listOfRegisters[0].date;
  const { overworked, periodHoursWorked } = infoWorked;

  function handleLogOut() {
    logOut();
  }

  const { width } = Dimensions.get('window')

  return (
    <SafeAreaView>
      { listOfRegisters && 
      <View>
        <Text style={styles.info}>Date: {today}</Text>
        <Text style={[styles.info, overworked && styles.infoMsgError]}>Hours worked: {periodHoursWorked}</Text>
        <ListRegisters data={listOfRegisters} />
      </View>
      }
        
    </SafeAreaView>  
  );
}

export default DailyTS;
