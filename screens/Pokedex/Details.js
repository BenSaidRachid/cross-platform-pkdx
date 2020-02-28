import React, {useState, useEffect} from 'react';
import { Text} from 'react-native';
import api from './../../services/api';
import utils from './../../helpers/utils';

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
                imageUrl: data.sprites.front_default,
                shiny: false
            })
        } catch(error) {}
    }

    return (
      <Text>Detail</Text>
    );
}