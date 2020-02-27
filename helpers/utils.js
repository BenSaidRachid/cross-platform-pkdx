function getTypePath(type) {
    return `./../../assets/type_pokemon/${type}.png`;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
    getTypePath,
    capitalize
};
  