import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import AuthContext from '../../contexts/auth';

const Application: React.FC = () => {

  const { logOut } = useContext(AuthContext)

  function handleLogOut() {
    logOut();
  }

  return (
    <View>
      <Button title='Log out' onPress={handleLogOut}/>
    </View>
  );
}

export default Application;
