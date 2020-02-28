import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Switch, Text, TouchableOpacity, Image } from 'react-native';
import api from './../services/api';
import storage from './../helpers/storage';
import constants from './../data/constants';
import empty_heart from './../assets/empty_heart.png';
import heart from './../assets/heart.png';

export default Item = (data) => {
    const [pokemon, setPokemon] = useState({pokemon: null, shiny: null, imageUrl: null, isFavorite: false})
    useEffect(() => {
        getPokemon(data.url);
    }, [])

    useEffect(() => {
        if(pokemon.shiny !== null) {
            if(pokemon.shiny) {
                setPokemon({...pokemon, imageUrl: pokemon.sprites.front_shiny})
            } else {
                setPokemon({...pokemon, imageUrl: pokemon.sprites.front_default})
            }
        }
    }, [pokemon.shiny])

    useEffect(() => {
        if(pokemon) {
            getFavorite();
        }
    }, [pokemon])

    const formatNdex = index => {
        if(index < 10) {
            return `00${index}`;
        } else if(index < 100) {
            return `0${index}`;
        }
        return index
    }

    const getPokemon = async (url) => {
        try {
            const {data} = await api.pokemons.getOne(url);
            setPokemon({
                id: data.id,
                name: data.name,
                sprites: data.sprites,
                types: data.types.map(data => data.type.name),
                imageUrl: data.sprites.front_default,
                shiny: false
            });
        } catch(error) {}
    }

    const getFavorite = async () => {
        try {
            const userData = await storage.get(constants.USER);
            const {value} = userData;
            const {user} = value;
            await api.trainers.getOne({uid: user.uid, id: pokemon.id});

        } catch(error) {}
    }

    const setFavorite = async () => {
        try {
            const isAuth = await api.auth.isAuth();
           
            if(!isAuth)
                navigation.navigate('Auth', {
                    screen: 'Login',
                    params: { onGoBack : () => setFavorite() },
                });
            else {
             try {
                const userData = await storage.get(constants.USER);
                const {value} = userData;
                const {user} = value;
                await api.trainers.addPokemon({uid: user.uid, id: pokemon.id});

                setPokemon({
                    ...pokemon,
                     isFavorite: !pokemon.isFavorite
                });
             } catch(error) {}
            }
        } catch(error) {}
    }
    
    return (
      <TouchableOpacity 
        style={{alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}
        onPress={() => data.navigation.navigate('Detail', {id: (pokemon || {}).id})}>
        {
            pokemon && <View style={styles.item}>
            <Text style={styles.index}>#{formatNdex(pokemon.id)}</Text>
            <Image style={{marginHorizontal:5, width: 100, height: 100}} source={{uri: pokemon.imageUrl || ""}} />
            <Text style={styles.name}>{pokemon.name}</Text>
            <Switch style={{  marginEnd: 15, transform: [{ scaleX: .8 }, { scaleY: .8 }]}} value={pokemon.shiny} onValueChange={value => setPokemon({...pokemon, shiny: value})}/>
            <TouchableOpacity onPress={() => setFavorite()}>
                <Image style={{ width: 30, height: 30}} source={pokemon.isFavorite ? heart : empty_heart} />
            </TouchableOpacity>
        </View>
        }
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    index: {
        opacity: 0.5,
        fontSize: 15,
        color: 'black',
        fontStyle: 'italic'
    },
    name: {
        opacity: 0.5,
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginEnd: 15,
        flex: 1
    },
});