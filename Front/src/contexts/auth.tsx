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
  result: {
    date: string;
    time: string;
    type: string;
  }
}

interface IAuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  listOfRegisters: Array<any>; 
  infoWorked: object;
  signIn(email: string, password: string): Promise<void | string>;
  signUp(name: string, email: string, password: string): Promise<void | string>;
  logOut(): void;
  register(): Promise<registerDto>;
  getRegisterPeriod(startDate: string, endDate: string): Promise<Array<any>>
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

type Props = { children: ReactNode }

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [listOfRegisters, setListOfRegisters] = useState<Object[]>([{}]);
  const [infoWorked, setInfoWorked] = useState<object>({});

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
    AsyncStorage.clear().then(() => {
      setUser(null)
    }
    )
  }

  async function register() {
    const storagedToken = await AsyncStorage.getItem('@controle-ponto:token')
    const response = await registerAuth.postRegister(storagedToken)
    return response
    
  }

  async function getRegisterPeriod(startDate: string, endDate: string) {
    
    const storagedToken = await AsyncStorage.getItem('@controle-ponto:token')
    const response = await registerAuth.getRegister(storagedToken, startDate, endDate)
    
    if(response.length){
      setListOfRegisters(response[0][0].registers)
      setInfoWorked(response[1])
      setLoading(false)
    }
    
    return response
    
  }


  return (
    <AuthContext.Provider
      value={{ 
        signed: !!user, user, loading,
        signIn, signUp, logOut,
        register, listOfRegisters, getRegisterPeriod,
        infoWorked
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
};
