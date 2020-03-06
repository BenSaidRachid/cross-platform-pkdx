import axios from "axios";

const pokemons = {
    getFirst: () => {
      return axios.get("https://pokeapi.co/api/v2/pokemon/")
    },
    getNext: url => {
        return axios.get(url)
    },
    getPrevious: url => {
        return axios.get(url)
    },
    getOne: async (url) => {
        return axios.get(url)
    },
    getOneById: async (id) => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    },
};
  
export default pokemons;  