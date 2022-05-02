import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import * as registerAuth from '../services/register'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useAuth } from './auth';

interface register {
  date: string;
  time: string;
  type: string; 
}

interface ObjInfoWorked {
  periodOverworked: boolean;
  periodHoursWorked: string;
}

interface ObjDateOfRegisters {
  firstDay: register[];
  infoWorked: ObjInfoWorked;
  list: any[];
}

interface ObjRegister {
  message: string; 
  type: string; 
  nextType: string; 
  date: string; 
  time: string;
}

interface IRegisterContextData {
  dataOfRegisters: ObjDateOfRegisters | null; 
  messageError: string | null;
  responseRegister: ObjRegister | null;
  register(): Promise<void>;
  getRegisterPeriod(startDate: string, endDate: string): Promise<object>
}

const RegisterContext = createContext<IRegisterContextData>({} as IRegisterContextData)

type Props = { children: ReactNode }

export const RegisterProvider: React.FC<Props> = ({ children }) => {

  const [dataOfRegisters, setDataOfRegisters] = useState<ObjDateOfRegisters | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [responseRegister, setResponseRegister] = useState<ObjRegister | null>(null);

  const { logOut } = useAuth()

  async function register() {
    const storagedToken = await AsyncStorage.getItem('@controle-ponto:token')
    const response = await registerAuth.postRegister(storagedToken)
    
      if(validateSession(response)){
        setResponseRegister({
          message: response.message,
          type: response.result.type,
          nextType: response.nextType,
          date: response.result.date,
          time: response.result.time
        })
      }
    
  }

  async function getRegisterPeriod(startDate: string, endDate: string) {
    const storagedToken = await AsyncStorage.getItem('@controle-ponto:token')
    const response = await registerAuth.getRegister(storagedToken, startDate, endDate)
    
    if(validateSession(response)){
      if(response.length){
        setMessageError(null)
        setDataOfRegisters({
          infoWorked: response[1],
          firstDay: response[0][0].registers,
          list: response,
        })
        return response
      }
      setMessageError(response.message)
      return response
    }
  }

  function validateSession(response: any) {
    if(typeof response != 'object'){
      Alert.alert('Oops an error occurred','Message: Your session has expired')
      clearRegisters()
      logOut()
      return false
    }
    return true
  }

  function clearRegisters() {
    setResponseRegister(null)
    setDataOfRegisters(null)
  }



  return (
    <RegisterContext.Provider
      value={{
        register, getRegisterPeriod,
        responseRegister, dataOfRegisters, messageError
      }}>
      {children}
    </RegisterContext.Provider>
  )
}

export function useRegister() {
  const context = useContext(RegisterContext)
  return context
};
