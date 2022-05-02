import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { RegisterProvider } from './contexts/register';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RegisterProvider>
          <Routes />
        </RegisterProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
