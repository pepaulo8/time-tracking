import React from 'react';
import { useAuth } from '../contexts/auth';
import AppRoutes from './app.routes';
import Loader from '../components/loader';
import AuthRoutes from './auth.routes';


const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if(loading){
    return <Loader />
  }

  return  signed ? <AppRoutes /> : <AuthRoutes />
  
}

export default Routes;
