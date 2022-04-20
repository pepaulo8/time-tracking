import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import screenStyles from './screenStyles';

const AuthStack = createStackNavigator();



const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator initialRouteName='Login'>
        <AuthStack.Screen 
        name="Login" component={SignIn}
        options={screenStyles.Login.options}
        />
        <AuthStack.Screen 
        name="SignUp" component={SignUp}
        options={screenStyles.SignUp.options}
        />
    </AuthStack.Navigator>
);

export default AuthRoutes;
