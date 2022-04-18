import React, { createContext, ReactNode, useState } from 'react';
import * as auth from '../services/auth'

interface IAuthContextData {
  signed: boolean;
  user: object | null;
  signIn(): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

type Props = { children: ReactNode }

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<object | null>(null);

  async function signIn() {
     const response = await auth.signIn();
     typeof response == undefined ? setUser(null) : setUser(response.user);
  }

  function logOut() {
    setUser(null)
  }

  
  return (
  <AuthContext.Provider value={{ signed: !!user, user , signIn, logOut}}>
    {children}
  </AuthContext.Provider>
)}

export default AuthContext;
