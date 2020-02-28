import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import api from './../../services/api';
import ListItems from './../../components/ListItems';

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
                    renderItem={({ item }) => <ListItems {...item} navigation={navigation}/>}
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
    }
});