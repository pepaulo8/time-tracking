import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../contexts/auth';

const Application: React.FC = () => {

  const { logOut, user } = useAuth()

  function handleLogOut() {
    logOut();
  }

  return (
    <View>
      <Text>Olá, {user?.name}</Text>
      <Button title='Log out' onPress={handleLogOut}/>
    </View>
  );
}

export default Application;
