import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Application from '../pages/Application';
import DailyTS from '../pages/Application/dailyTS';
import screenStyles from './screenStyles';

const AuthStack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen 
        name="Home" component={Application}
        options={screenStyles.Login.options}
        />
        <AuthStack.Screen 
        name="Daily Time sheet" component={DailyTS}
        options={screenStyles.Login.options}
        />
    </AuthStack.Navigator>
);

export default AppRoutes;
