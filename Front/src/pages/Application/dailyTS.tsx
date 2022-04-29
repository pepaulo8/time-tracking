import React, { useState } from 'react';
import { Button, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListRegisters from '../../components/listRegisters';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import moment from "moment";
import Loader from '../../components/loader';


const DailyTS: React.FC = () => {

  const { dataOfRegisters, messageError } = useAuth()

  if(dataOfRegisters == null && messageError == null){
    return (
      <Loader />
    ) 
  }

  const IMAGE_NO_REGISTERS = require('../../assets/sad-clock-legs.png');
  var hasError = Boolean(messageError);
  var today: string = '';
  var overworked: boolean = false;
  var periodHoursWorked: string = '00:00';
  
  if(dataOfRegisters) {
    today = dataOfRegisters.firstDay[0].date; 
    overworked = dataOfRegisters.infoWorked.periodOverworked; 
    periodHoursWorked = dataOfRegisters.infoWorked.periodHoursWorked; 
  }

  const { width } = Dimensions.get('window')

  return (
    <SafeAreaView>
      { dataOfRegisters && 
      <View>
        <Text style={styles.info}>Date: {today}</Text>
        <Text style={[styles.info, overworked && styles.infoMsgError]}>Hours worked: {periodHoursWorked}</Text>
        <ListRegisters data={dataOfRegisters.firstDay} />
      </View>
      }
      { hasError && 
      <View style={{height: '100%' ,alignItems: 'center', justifyContent:'center'}}>
        <Text style={styles.titleError}> {messageError} for today</Text>
        <Image
          style={styles.imgLogo}
          source={IMAGE_NO_REGISTERS}
        />
      </View>
      }
        
    </SafeAreaView>  
  );
}

export default DailyTS;
