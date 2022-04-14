import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Application from '../pages/Application';

const AuthStack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Application" component={Application}/>
    </AuthStack.Navigator>
);

export default AppRoutes;
