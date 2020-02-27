import {AsyncStorage} from 'react-native';

const storage = {
  get: key => {
    return AsyncStorage.getItem(key).then(data => JSON.parse(data));
  },
  set: (key, value) => {
    return AsyncStorage.setItem(key, JSON.stringify({ value }));
  },
  remove: key => {
    return AsyncStorage.removeItem(key);
  },
  clear: () => {
    return AsyncStorage.clear().then(() => true);
  }
};

export default storage;