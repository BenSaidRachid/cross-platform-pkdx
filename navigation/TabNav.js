import React from 'react';
import 'react-native-gesture-handler';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Wishlist from '../screens/Trainer/Wishlist';
import Home from './Home';
import PokedexIcon from './../assets/pokemon.png';
import WishlistIcon from './../assets/heart.png';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const WishlistNavigator = () => <Stack.Navigator initialRouteName="Pokédex">
  <Stack.Screen 
    name="Wishlist" 
    component={Wishlist}
    options={{
        headerStyle: {
        backgroundColor: '#D42D2D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
        },
    }}/>
</Stack.Navigator>

export default TabNav = () => <Tab.Navigator initialRouteName="Pokédex">
    <Tab.Screen 
        name="Pokédex"
        component={Home}
        options={{
            tabBarLabel: "Pokédex",
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={PokedexIcon}
                style={{ width: 26, height: 26, tintColor: tintColor }}
              />
            )
        }}
        
        />
    <Tab.Screen
        name="Wishlist" 
        component={WishlistNavigator}
        options={{
            tabBarLabel: "Wishlist",
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={WishlistIcon}
                style={{ width: 26, height: 26, tintColor: tintColor }}
              />
            ),
        }} />
</Tab.Navigator>