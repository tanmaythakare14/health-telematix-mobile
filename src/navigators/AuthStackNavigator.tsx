import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from 'screens';
import { AuthStackParamList } from 'types/types';
import { AUTH_STACK_NAVIGATOR } from './routes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AUTH_STACK_NAVIGATOR.LOGIN_SCREEN}
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
