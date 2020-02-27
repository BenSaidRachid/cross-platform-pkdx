import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Switch, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import api from './../../services/api';
import empty_star from './../../assets/empty_star.png';
import star from './../../assets/star.png';
function Item(data) {
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
            <TouchableOpacity onPress={() => setPokemon({...pokemon, isFavorite: !pokemon.isFavorite})}>
                <Image style={{ width: 30, height: 30}} source={pokemon.isFavorite ? star : empty_star} />
            </TouchableOpacity>
        </View>
        }
      </TouchableOpacity>
    );
}

export default function List({navigation}) {
    const [state, setState] = useState({pokemons: [], nextUrl: ""})

    useEffect(() => {
        getPokemons(true);
    }, [])

    const getPokemons = async (getFirst = false) => {
        try {
            const {data} = getFirst ? await api.pokemons.getAll() : await api.pokemons.getNext(state.nextUrl);
            const {next, results} = data;
            setState({
                pokemons: [...state.pokemons, ...results],
                nextUrl: next
            });
        } catch(error) {}
    }

    const {pokemons} = state;
    return (
      <SafeAreaView style={styles.container}>
       <View style={{flex:1, marginHorizontal: 25, marginTop: 20}}>
            {
                pokemons ? 
                <FlatList
                    data={pokemons}
                    renderItem={({ item }) => <Item {...item} navigation={navigation}/>}
                    keyExtractor={(item, index) => 'key_' + index}
                    onEndReached={() => getPokemons()}
                    onEndReachedThreshold={0}
                />
                :
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator size="large" color="#D42D2D" />
                </View>
            }
        </View>
      </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        flex: 1,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_container: {
        flexDirection: 'column'
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