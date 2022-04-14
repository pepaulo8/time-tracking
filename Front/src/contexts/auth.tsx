import React, { createContext, ReactChild, ReactChildren, ReactNode } from 'react';
import * as auth from '../services/auth'

interface IAuthContextData {
  signed: boolean;
  user: object;
  signIn(): Promise<void>
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

type Props = { children: ReactNode }

export const AuthProvider: React.FC<Props> = ({ children }) => {

  async function signIn() {
     const response = await auth.signIn();
     console.log("response", response);
  }
  
  return (
  <AuthContext.Provider value={{ signed: false, user: {} , signIn}}>
    {children}
  </AuthContext.Provider>
)}

export default AuthContext;
