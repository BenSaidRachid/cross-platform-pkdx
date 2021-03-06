import React, {Component} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase_init from './config/firebase_init';
import TabNav from './navigation/TabNav';
import Auth from './navigation/Auth';

const Stack = createStackNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);
    firebase_init();
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
            name="Home"
            component={TabNav}
            options={{
              headerShown: false
            }} />
            <Stack.Screen 
            name="Auth"
            component={Auth}
            options={{
              headerShown: false
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}