import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';
import Loader from '../components';
import AuthRoutes from './auth.routes';


const Routes: React.FC = () => {
  const { signed, loading } = useContext(AuthContext);

  if(loading){
    return <Loader />
  }

  return  signed ? <AppRoutes /> : <AuthRoutes />
  
}

export default Routes;
