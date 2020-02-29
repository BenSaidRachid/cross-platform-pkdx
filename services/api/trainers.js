import firebase from "firebase";
import {TRAINERS, trainerFavorite} from "./../../helpers/firebase_ref";
const trainers = {
    addPokemon: ({uid, id, favorite}) => {
        const pokemonReference = firebase.database().ref();
        const pokemonId = pokemonReference.push().key;
        let referencePath = trainerFavorite(uid, pokemonId);
        
        pokemonReference.child(referencePath).set({pokemonID: id});
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
            trainerReference.orderByChild('pokemonID')
                .equalTo(id)
                .on("value", snapshot => {
                    resolve(snapshot.val());
                })
        });

        return getPokemons.then(pokemons => pokemons);
    }
};
  
export default trainers;  