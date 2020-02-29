import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Switch, Text, TouchableOpacity, Image } from 'react-native';
import api from './../services/api';
import storage from './../helpers/storage';
import utils from './../helpers/utils';
import constants from './../data/constants';
import empty_heart from './../assets/empty_heart.png';
import heart from './../assets/heart.png';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            name: null,
            sprites: [],
            types: [],
            imageUrl: null,
            isShiny: false,
            imageUrl: null,
            isFavorite: false
        }
    }

    componentDidUpdate() {
        this._getPokemon(this.props.url);
    }
   
    _handleIsShinyToggle = value => {
        
        const imageUrl = value ? this.state.sprites.front_shiny : this.state.sprites.front_default;
        this.setState({
            ...this.state,
            isShiny: value,
            imageUrl
        })
    }
    _getPokemon = async (url) => {
        try {
            const {data} = await api.pokemons.getOne(url);
            this.setState({
                ...this.state,
                id: data.id,
                name: data.name,
                sprites: data.sprites,
                types: data.types.map(data => data.type.name),
                imageUrl: data.sprites.front_default,
                isShiny: this.state.isShiny,
                isFavorite: this.state.isFavorite
            }, () => {
                this._getFavorite()
            });
        } catch(error) {}
    }

    _getFavorite = async () => {
        try {
            const userData = await storage.get(constants.USER);
            const {value} = userData;
            const {user} = value;
            const isFavorite = await api.trainers.getOne({uid: user.uid, id: this.state.id});
            this.setState({
                ...this.state,
                isFavorite: isFavorite ? true : false
            });

        } catch(error) {}
    }

    _setFavorite = async () => {
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
                await api.trainers.addPokemon({uid: user.uid, id: this.state.id});
                this.setState({
                    ...this.state,
                     isFavorite: !this.state.isFavorite
                });
             } catch(error) {}
            }
        } catch(error) {}
    }
    
    render() {
        return (
            <TouchableOpacity style={{alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}} onPress={() => this.props.navigation.navigate('Detail', {id: (this.state || {}).id})}>
              {
                  this.state.id > 0 && <View style={styles.item}>
                  <Text style={styles.index}>#{utils.formatNdex(this.state.id)}</Text>
                  <Image style={{marginHorizontal:5, width: 100, height: 100}} source={{uri: this.state.imageUrl || ""}} />
                  <Text style={styles.name}>{this.state.name}</Text>
                  <Switch style={{ marginEnd: 15, transform: [{ scaleX: .8 }, { scaleY: .8 }]}} value={this.state.isShiny} onValueChange ={value => console.log('onValueChange', value)}/>
                  <TouchableOpacity onPress={() => this._setFavorite()}>
                      <Image style={{ width: 30, height: 30}} source={this.state.isFavorite ? heart : empty_heart} />
                  </TouchableOpacity>
              </View>
              }
            </TouchableOpacity>
          );
    }
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