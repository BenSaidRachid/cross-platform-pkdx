import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity,FlatList, View, Text, SafeAreaView } from 'react-native';
import api from './../../services/api';
import storage from '../../helpers/storage';
import constants from '../../data/constants';
import ListItems from './../../components/ListItems';

export default function Wishlist({navigation}) {
    const [state, setState] = useState({isAuth: false, uid: null, wishlist: []});
    useEffect(() => {
        checkAuth();
    }, [])

    useEffect(() => {
        if(state.isAuth && state.uid) {
            getWishlist();
        }
    }, [state.isAuth])

    const getWishlist = async () => {
        const {uid} = state;
        const wishlist = await api.trainers.getAll({uid});
        if(wishlist) {
            let pokemons = [];
            for (const id in wishlist) {
                const {pokemonID} = wishlist[id];

                pokemons.push({url: `https://pokeapi.co/api/v2/pokemon/${pokemonID}`})
            }
            setState({...state, wishlist: pokemons});
        }
    }

    const checkAuth = async () => {
        const isAuth = await api.auth.isAuth();
        
        if(!isAuth)
            navigation.navigate('Auth', {
                screen: 'Login',
                params: { onGoBack : () => checkAuth() },
            });
        else {
         try {
            const userData = await storage.get(constants.USER);
            const {value} = userData;
            const {user} = value;
            setState({...state, isAuth: true, uid: user.uid});
         } catch (error) {
         }
        }
    };

    return (
      <SafeAreaView style={styles.container}>
        {
            state.isAuth ? state.wishlist.length > 0 ? <View style={{flex:1, marginHorizontal: 25, marginTop: 20}}>
                <FlatList
                    data={state.wishlist}
                    renderItem={({ item }) => <ListItems {...item} navigation={navigation} keyExtractor={(item, index) => 'key_' + index}/>}
                    keyExtractor={(item, index) => 'key_' + index}
                />
            </View> : 
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#D42D2D'}}>There is no pokemon in your wishlist</Text>
            </View> : 
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#D42D2D'}}>You have to be connected to display your wishlist</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Auth', {
                    screen: 'Login',
                    params: { onGoBack : () => checkAuth() },
                })}>
                    <Text style={{color: '#007BFE'}}>Sign in</Text>
                </TouchableOpacity>
            </View>
        }
        
      </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});