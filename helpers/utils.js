function getTypePath(type) {
    return `./../../assets/type_pokemon/${type}.png`;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterPokemon(search, pokemons) {
    if(search.length === 0) return pokemons;
    const regex = new RegExp(`^${search}`, "i");
   
    return pokemons.filter(function(pokemon) {
        if(pokemon.name.match(regex) !== null) return true;
    })
}

const formatNdex = index => {
    if(index < 10) {
        return `00${index}`;
    } else if(index < 100) {
        return `0${index}`;
    }
    return index
}

export default {
    getTypePath,
    capitalize,
    filterPokemon,
    formatNdex
};
  