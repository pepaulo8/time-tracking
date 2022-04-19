import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import { Image } from 'react-native';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen 
        name="Login" component={SignIn}
        options={{
            headerStyle: {
                backgroundColor: '#F1F5F4',
              },
            headerTintColor: '#139DBF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              //fontFamily: Roboto
            },
            headerTitleAlign: 'center'
          }}
        />
    </AuthStack.Navigator>
);

export default AuthRoutes;
