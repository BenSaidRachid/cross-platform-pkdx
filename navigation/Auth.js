import React from 'react';
import 'react-native-gesture-handler';;
import { createStackNavigator } from '@react-navigation/stack';
import Login from './../screens/Auth/Login';
import SignUp from './../screens/Auth/SignUp';

const Stack = createStackNavigator();

export default function Auth() {
  return <Stack.Navigator initialRouteName="Login">
    <Stack.Screen 
      name="Login"
      component={Login}
      options={{
        title: "Connexion",
        headerStyle: {
          backgroundColor: '#D42D2D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }} />
    <Stack.Screen 
      name="SignUp" 
      component={SignUp}
      options={{
        title: "Inscription",
        headerStyle: {
          backgroundColor: '#D42D2D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }} />
  </Stack.Navigator>
}