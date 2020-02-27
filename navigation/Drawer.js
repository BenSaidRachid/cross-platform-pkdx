import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Wishlist from './../screens/Trainer/Wishlist';
import Home from './../navigation/Home';

const Drawer = createDrawerNavigator();

export default drawerNavigation = () => <Drawer.Navigator initialRouteName="Pokédex">
    <Drawer.Screen 
        name="Pokédex"
        component={Home}/>
    <Drawer.Screen
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
        }} />
</Drawer.Navigator>