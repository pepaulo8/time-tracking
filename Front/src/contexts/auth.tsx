import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/auth/api';

interface User {
  name: string;
  email: string;
}

interface IAuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  messageError: string | undefined;
  signIn(email:string, password:string): Promise<void | string>;
  logOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

type Props = { children: ReactNode }

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [messageError, setMessageError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData (){
      const storagedData = await AsyncStorage.multiGet(['@controle-ponto:user','@controle-ponto:token'])
      const storagedUser = storagedData[0][1]
      const storagedToken = storagedData[1][1]
    
      if(storagedUser && storagedToken){
        api.defaults.headers.common = {'Authorization': `Bearer ${storagedToken}`}
        setUser(JSON.parse(storagedUser))
      }
      setLoading(false)
    }

    loadStoragedData()
  })

  async function signIn(email: string, password: string) {
     const response = await auth.signIn(email, password);
     
     if(response.message){
       setMessageError(response.message)
      } else {
        setMessageError(undefined)
        setUser(response.user);

        api.defaults.headers.common = {'Authorization': `Bearer ${response.token}`}

        AsyncStorage.setItem('@controle-ponto:user', JSON.stringify(response.user))
        AsyncStorage.setItem('@controle-ponto:token', response.token)
      }
      
  }

  function logOut() {
    AsyncStorage.clear().then(() => {
      setUser(null)
      }
    )
  }

  
  return (
  <AuthContext.Provider value={{ signed: !!user, user , loading, messageError, signIn, logOut}}>
    {children}
  </AuthContext.Provider>
)}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
};
