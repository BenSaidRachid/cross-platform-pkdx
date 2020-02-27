import React from 'react';
import 'react-native-gesture-handler';;
import { createStackNavigator } from '@react-navigation/stack';
import PokedexList from './../screens/Pokedex/List';
import PokedexDetails from './../screens/Pokedex/Details';

const Stack = createStackNavigator();

export default Home = () => <Stack.Navigator initialRouteName="Pokédex">
  <Stack.Screen 
    name="Pokédex"
    component={PokedexList}
    options={{
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
    name="Detail" 
    component={PokedexDetails}
    options={{
      title: "Detail",
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