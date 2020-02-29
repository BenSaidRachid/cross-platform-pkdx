import React, {useState, useEffect} from 'react';
import { Image, View, Text, StyleSheet} from 'react-native';
import api from './../../services/api';
import utils from './../../helpers/utils';
import { ScrollView } from 'react-native-gesture-handler';

export default function Details({route, navigation}) {
    const [pokemon, setPokemon] = useState(null)
    useEffect(() => {
        getPokemon();
    }, [])

    useEffect(() => {
       if(pokemon) {
            navigation.setOptions({title: utils.capitalize(pokemon.name)})
       }
    }, [pokemon])

    const getPokemon = async () => {
        const {params} = route;
        try {
            const {data} = await api.pokemons.getOneById(params.id);
            setPokemon({
                id: data.id,
                name: data.name,
                sprites: data.sprites,
                types: data.types.map(data => data.type.name),
                moves: data.moves.map(data => data.move.name),
                imageUrl: data.sprites.front_default,
                isBack: false
            })
        } catch(error) {}
    }

    return (
      <View style={styles.container}>
        {pokemon &&
            <View style={[styles.container, {alignItems: 'center'}]}>
                <Image style={{ width: 200, height: 200}} source={{uri: pokemon.imageUrl || ""}} />
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                    <Text style={styles.name}>{pokemon.name}</Text>
                    <Text style={styles.index}>N° {utils.formatNdex(pokemon.id)}</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.moves}>Moves</Text>
                    <ScrollView style={{marginBottom: 15}}>
                    {pokemon.moves.map((move, index) => 
                            <Text key={index} style={styles.move}>{`${++index} - ${move}`}</Text>
                    )}
                    </ScrollView>

                </View>
            </View>
        }
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    name: {
        opacity: 0.5,
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginEnd: 15,
    },
    index: {
        opacity: 0.5,
        fontSize: 25,
        color: 'black',
        fontStyle: 'italic'
    },
    moves: {
        fontSize: 20,
        marginBottom: 5,
        color: 'black',
        textDecorationLine: 'underline'
    },
    move: {
        fontSize: 20,
        color: 'black',
        fontStyle: 'italic'
    },
});