import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth'
import * as userAuth from '../services/user'
import * as registerAuth from '../services/register'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import moment from "moment";

interface User {
  name: string;
  email: string;
}

interface registerDto {
  message: string;
  nextType: string;
  result: register
}

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

interface IAuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  dataOfRegisters: ObjDateOfRegisters | null; 
  messageError: string | null;
  responseRegister: ObjRegister | null;
  signIn(email: string, password: string): Promise<void | string>;
  signUp(name: string, email: string, password: string): Promise<void | string>;
  logOut(): void;
  register(): Promise<void>;
  getRegisterPeriod(startDate: string, endDate: string): Promise<object>
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

type Props = { children: ReactNode }

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataOfRegisters, setDataOfRegisters] = useState<ObjDateOfRegisters | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [responseRegister, setResponseRegister] = useState<ObjRegister | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedData = await AsyncStorage.multiGet(['@controle-ponto:user', '@controle-ponto:token'])
      const storagedUser = storagedData[0][1]
      const storagedToken = storagedData[1][1]

      if (storagedUser && storagedToken) {
        api.defaults.headers.common = { 'Authorization': `Bearer ${storagedToken}` }
        setUser(JSON.parse(storagedUser))
      }
      setLoading(false)
    }

    loadStoragedData()
  })

  async function signIn(email: string, password: string) {
    console.log('signIn iniciado...')
    const response = await auth.signIn(email, password);

    if (response.message) {
      return response.message
    } else {
      setUser(response.user);

      api.defaults.headers.common = { 'Authorization': `Bearer ${response.token}` }

      AsyncStorage.setItem('@controle-ponto:user', JSON.stringify(response.user))
      AsyncStorage.setItem('@controle-ponto:token', response.token)
    }

  }
  
  async function signUp(name: string, email: string, password: string) {
    const response = await userAuth.signUp(name, email, password);

    if (response.statusCode) {
      return response.message
    } else {
      signIn(email, password)
    }

  }

  function logOut() {
    console.log('logout iniciado')
    AsyncStorage.clear()
    .then(() => {
      setUser(null)
      setResponseRegister(null)
      setDataOfRegisters(null)
    })
  }

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
    setLoading(true)
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
        console.log('response getRegisterPeriod', response)
        return response
      }
      console.log('response Error getRegisterPeriod', response)
      setMessageError(response.message)
      setLoading(false)
      return response
    }
  }

  function validateSession(response: any) {
    if(typeof response != 'object'){
      console.warn('Your session has expired')
      logOut()
      return false
    }
    return true
  }



  return (
    <AuthContext.Provider
      value={{ 
        signed: !!user, user, loading,
        signIn, signUp, logOut,
        register, dataOfRegisters, getRegisterPeriod,
        responseRegister, messageError
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
};
