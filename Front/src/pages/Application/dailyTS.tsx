import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListRegisters from '../../components/listRegisters';
import styles from './styles';
import Loader from '../../components/loader';
import { useRegister } from '../../contexts/register';


const DailyTS: React.FC = () => {

  const { dataOfRegisters, messageError } = useRegister()

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

  return (
    <SafeAreaView style={{flex: 1}}>
      { dataOfRegisters && 
      <View style={{flex: 1}}>
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
