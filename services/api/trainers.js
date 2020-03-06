import firebase from "firebase";
import {TRAINERS, trainerFavorite} from "./../../helpers/firebase_ref";
const trainers = {
    addPokemon: ({uid, id, name, sprites, types, imageUrl}) => {

        const pokemonReference = firebase.database().ref();
        const pokemonId = pokemonReference.push().key;
        let referencePath = trainerFavorite(uid, pokemonId);
        
        pokemonReference.child(referencePath).set({id, name, sprites, types, imageUrl});
    },
    getAll: ({uid}) => {
        const trainerReference =  firebase.database().ref(TRAINERS + uid);
        const getPokemons = new Promise((resolve, reject) => {
            trainerReference.on("value", snapshot => {
                resolve(snapshot.val());
            });
        });
        
        return getPokemons.then(pokemons => pokemons);
    },
    getOne: ({uid, id}) => {
        const trainerReference =  firebase.database().ref(TRAINERS + uid);
    
        const getPokemons = new Promise((resolve, reject) => {
            trainerReference.orderByChild('id')
                .equalTo(id)
                .on("value", snapshot => {
                    resolve(snapshot.val());
                })
        });

        return getPokemons.then(pokemons => pokemons);
    }
};
  
export default trainers;  