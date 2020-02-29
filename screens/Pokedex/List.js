import React, { Component} from 'react';
import { StyleSheet, View, TextInput, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import api from './../../services/api';
import ListItems from './../../components/ListItems';
import utils from './../../helpers/utils';

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemons: [],
            pokemonsFiltered: [],
            search: "",
            nextUrl: "",
            loading: false
        }
        this._getPokemons(true);
    }
    

    _searchPokemon = text => {
        const pokemonFound = utils.filterPokemon(text, this.state.pokemons);
        this.setState({
            ...this.state,
            pokemonsFiltered: pokemonFound,
            search: text,
            loading: false
        });
    }

    _getPokemons = async (getFirst = false) => {
        try {
            this.setState({...this.state, loading: true });
            const {data} = getFirst ? await api.pokemons.getAll() : await api.pokemons.getNext(this.state.nextUrl);
            const {next, results} = data;
            this.setState({
                ...this.state,
                pokemons: [...this.state.pokemons, ...results],
                nextUrl: next,
            }, () => {
                this._searchPokemon(this.state.search)
            });
        } catch(error) {}
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
             <View style={{flex:1, marginHorizontal: 25, marginTop: 20}}>
                  {
                      this.state.pokemonsFiltered ? 
                      <View>
                          <TextInput
                              style={{borderBottomWidth: 1, padding: 15}}
                              onChangeText={text => this._searchPokemon(text)}
                              value={this.state.search}
                              placeholder="Search a pokemon"
                          />
                          <FlatList
                              data={ this.state.pokemonsFiltered}
                              renderItem={({ item }) => <ListItems {...item} navigation={this.props.navigation}/>}
                              keyExtractor={(item, index) => 'key_' + index}
                              ListFooterComponent={() =>
                                this.state.loading
                                ? null
                                : <ActivityIndicator size="large" animating />}
                              onEndReached={() => this._getPokemons()}
                              onEndReachedThreshold={0}
                          />
                      </View>
                      :
                      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                          <ActivityIndicator size="large" color="#D42D2D" />
                      </View>
                  }
              </View>
            </SafeAreaView>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 100
    }
});